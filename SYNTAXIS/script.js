// Data (normally this would come from a server)
const hospitals = [
    { id: 1, name: 'RSUD Sleman' },
    { id: 2, name: 'RS Puri Husada' },
    { id: 3, name: 'RS JIH' },
];

const doctors = [
    { id: 1, name: 'dr. Ahmad', speciality: 'Poli Umum', schedule: '08:00 - 12:00', image: 'doctor1.jpg', hospitalId: 1 },
    { id: 2, name: 'dr. Sarah', speciality: 'Poli Anak', schedule: '13:00 - 17:00', image: 'doctor2.jpg', hospitalId: 1 },
    { id: 3, name: 'dr. Michael', speciality: 'Poli Gigi', schedule: '09:00 - 15:00', image: 'doctor3.jpg', hospitalId: 2 },
    { id: 4, name: 'dr. Emily', speciality: 'Poli Umum', schedule: '10:00 - 14:00', image: 'doctor4.jpg', hospitalId: 2 },
    { id: 5, name: 'dr. David', speciality: 'Poli Anak', schedule: '08:00 - 16:00', image: 'doctor5.jpg', hospitalId: 3 },
    { id: 6, name: 'dr. Lisa', speciality: 'Poli Gigi', schedule: '11:00 - 15:00', image: 'doctor6.jpg', hospitalId: 3 },
];

let state = {
    step: 1,
    selectedHospital: null,
    selectedDate: null,
    selectedDoctor: null,
    isLoggedIn: false,
    patientName: '',
    patientNIK: '',
    insuranceType: 'umum',
    bpjsNumber: ''
};

function generateUniqueCode(speciality) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    let prefix;
    switch(speciality.toLowerCase()) {
        case 'poli umum':
            prefix = 'PU';
            break;
        case 'poli anak':
            prefix = 'PA';
            break;
        case 'poli gigi':
            prefix = 'PG';
            break;
        default:
            prefix = 'XX';
    }
    return `${prefix}-${year}${month}${day}-${random}`;
}
function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    switch (state.step) {
        case 1:
            renderHospitalSelection();
            break;
        case 2:
            renderCalendarAndDoctors();
            break;
        case 3:
            renderAuthPage();
            break;
        case 4:
            renderBookingForm();
            break;
        case 5:
            renderConfirmation();
            break;
    }
}

function renderHospitalSelection() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Pilih Rumah Sakit</h2>
            <select id="hospitalSelect">
                <option value="">Pilih Rumah Sakit</option>
                ${hospitals.map(hospital => `<option value="${hospital.id}">${hospital.name}</option>`).join('')}
            </select>
            <div id="scheduleContainer" class="schedule-container"></div>
            <button id="nextBtn" disabled>Lanjutkan</button>
        </div>
    `;

    const hospitalSelect = document.getElementById('hospitalSelect');
    const nextBtn = document.getElementById('nextBtn');
    const scheduleContainer = document.getElementById('scheduleContainer');

    hospitalSelect.addEventListener('change', (e) => {
        state.selectedHospital = e.target.value;
        nextBtn.disabled = !state.selectedHospital;
        renderHospitalSchedule(state.selectedHospital);
    });

    nextBtn.addEventListener('click', () => {
        if (!state.selectedHospital) return;
        state.step = 2;
        renderApp();
    });
}

function renderHospitalSchedule(hospitalId) {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const hospitalDoctors = doctors.filter(doctor => doctor.hospitalId == hospitalId);

    if (hospitalDoctors.length === 0) {
        scheduleContainer.innerHTML = '<p>Tidak ada jadwal dokter tersedia untuk rumah sakit ini.</p>';
        return;
    }

    let scheduleHTML = '<h3>Jadwal Dokter</h3>';
    hospitalDoctors.forEach(doctor => {
        scheduleHTML += `
            <div class="doctor-schedule">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
                <div class="doctor-info">
                    <h4>${doctor.name}</h4>
                    <p>${doctor.speciality}</p>
                    <p>Jadwal: ${doctor.schedule}</p>
                </div>
            </div>
        `;
    });

    scheduleContainer.innerHTML = scheduleHTML;
}


function renderCalendarAndDoctors() {
    const app = document.getElementById('app');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const hospitalDoctors = doctors.filter(doctor => doctor.hospitalId == state.selectedHospital);

    app.innerHTML = `
        <div class="card">
            <h2>Pilih Tanggal dan Dokter</h2>
            <div id="calendar" class="calendar"></div>
            <div class="doctor-list">
                ${hospitalDoctors.map(doctor => `
                    <div class="doctor-card" data-id="${doctor.id}">
                        <img src="${doctor.image}" alt="${doctor.name}">
                        <h3>${doctor.name}</h3>
                        <p>${doctor.speciality}</p>
                        <p>${doctor.schedule}</p>
                    </div>
                `).join('')}
            </div>
            <button id="bookBtn" disabled>Booking</button>
        </div>
    `;

    renderCalendar(currentYear, currentMonth);

    const doctorCards = document.querySelectorAll('.doctor-card');
    const bookBtn = document.getElementById('bookBtn');

    doctorCards.forEach(card => {
        card.addEventListener('click', () => {
            doctorCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedDoctor = card.dataset.id;
            bookBtn.disabled = !state.selectedDate || !state.selectedDoctor;
        });
    });

    bookBtn.addEventListener('click', () => {
        if (!state.selectedDate || !state.selectedDoctor) return;
        state.step = 3;
        renderApp();
    });
}
function renderCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const date = new Date(year, month, 1);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const today = new Date();

    let calendarHTML = `
        <div class="calendar-header">
            <button id="prevMonth">&lt;</button>
            <h3>${date.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</h3>
            <button id="nextMonth">&gt;</button>
        </div>
    `;

    days.forEach(day => {
        calendarHTML += `<div class="calendar-day day-name">${day}</div>`;
    });

    const firstDay = date.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-day"></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const isToday = currentDate.toDateString() === today.toDateString();
        const isPast = currentDate < today;
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}" 
                 data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}"
                 ${isPast ? 'disabled' : ''}>
                ${i}
            </div>`;
    }

    calendar.innerHTML = calendarHTML;

    const calendarDays = document.querySelectorAll('.calendar-day[data-date]:not(.past)');
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            calendarDays.forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
            state.selectedDate = day.dataset.date;
            document.getElementById('bookBtn').disabled = !state.selectedDate || !state.selectedDoctor;
        });
    });

    document.getElementById('prevMonth').addEventListener('click', () => {
        const newDate = new Date(year, month - 1, 1);
        renderCalendar(newDate.getFullYear(), newDate.getMonth());
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        const newDate = new Date(year, month + 1, 1);
        renderCalendar(newDate.getFullYear(), newDate.getMonth());
    });
}

function renderAuthPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>${state.isLoggedIn ? 'Sign In' : 'Sign Up'}</h2>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            ${!state.isLoggedIn ? '<input type="password" id="confirmPassword" placeholder="Confirm Password" required>' : ''}
            <button id="authBtn" disabled>${state.isLoggedIn ? 'Sign In' : 'Sign Up'}</button>
            <p>
                ${state.isLoggedIn ? "Don't have an account? " : "Already have an account? "}
                <a href="#" id="toggleAuth">${state.isLoggedIn ? 'Sign Up' : 'Sign In'}</a>
            </p>
        </div>
    `;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const authBtn = document.getElementById('authBtn');

    const validateAuthFields = () => {
        const isValid = emailInput.value && passwordInput.value && (state.isLoggedIn || confirmPasswordInput.value);
        authBtn.disabled = !isValid; // Validasi input
    };

    emailInput.addEventListener('input', validateAuthFields);
    passwordInput.addEventListener('input', validateAuthFields);
    if (!state.isLoggedIn) {
        confirmPasswordInput.addEventListener('input', validateAuthFields);
    }

    authBtn.addEventListener('click', () => {
        // Validasi input dan kirim ke server
        state.isLoggedIn = true;
        state.step = 4;
        renderApp();
    });

    document.getElementById('toggleAuth').addEventListener('click', (e) => {
        e.preventDefault();
        state.isLoggedIn = !state.isLoggedIn;
        renderAuthPage();
    });
}

function renderBookingForm() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Booking Form</h2>
            <input type="text" id="patientName" placeholder="Nama Lengkap" required>
            <input type="text" id="patientNIK" placeholder="NIK" required>
            <select id="insuranceType">
                <option value="umum">Umum</option>
                <option value="bpjs">BPJS</option>
            </select>
            <div id="bpjsField" style="display: none;">
                <input type="text" id="bpjsNumber" placeholder="Nomor BPJS">
            </div>
            <div>
                <p>Poli: ${doctors.find(d => d.id == state.selectedDoctor).speciality}</p>
                <p>Dokter: ${doctors.find(d => d.id == state.selectedDoctor).name}</p>
                <p>Tanggal: ${state.selectedDate}</p>
            </div>
            <button id="confirmBtn" disabled>Konfirmasi Booking</button>
        </div>
    `;

    const patientNameInput = document.getElementById('patientName');
    const patientNIKInput = document.getElementById('patientNIK');
    const confirmBtn = document.getElementById('confirmBtn');

    const validateBookingFields = () => {
        confirmBtn.disabled = !patientNameInput.value || !patientNIKInput.value; // Validasi input
    };

    patientNameInput.addEventListener('input', validateBookingFields);
    patientNIKInput.addEventListener('input', validateBookingFields);

    const insuranceType = document.getElementById('insuranceType');
    const bpjsField = document.getElementById('bpjsField');

    insuranceType.addEventListener('change', (e) => {
        state.insuranceType = e.target.value;
        bpjsField.style.display = state.insuranceType === 'bpjs' ? 'block' : 'none';
    });

    confirmBtn.addEventListener('click', () => {
        state.patientName = patientNameInput.value;
        state.patientNIK = patientNIKInput.value;
        state.bpjsNumber = document.getElementById('bpjsNumber').value;
        state.step = 5;
        renderApp();
    });
}

function renderConfirmation() {
    const app = document.getElementById('app');
    const uniqueCode = generateUniqueCode(doctors.find(d => d.id == state.selectedDoctor).speciality);
    app.innerHTML = `
        <div class="card">
            <h2>Booking Confirmed</h2>
            <p>Terima kasih, ${state.patientName}!</p>
            <p>Booking Anda telah dikonfirmasi untuk:</p>
            <p>Rumah Sakit: ${hospitals.find(h => h.id == state.selectedHospital).name}</p>
            <p>Poli: ${doctors.find(d => d.id == state.selectedDoctor).speciality}</p>
            <p>Dokter: ${doctors.find(d => d.id == state.selectedDoctor).name}</p>
            <p>Tanggal: ${state.selectedDate}</p>
            <p>Jenis Layanan: ${state.insuranceType === 'bpjs' ? 'BPJS' : 'Umum'}</p>
            ${state.insuranceType === 'bpjs' ? `<p>Nomor BPJS: ${state.bpjsNumber}</p>` : ''}
            <p>Kode Unik: <strong>${uniqueCode}</strong></p>
            <button id="newBookingBtn">Buat Booking Baru</button>
        </div>
    `;

    document.getElementById('newBookingBtn').addEventListener('click', () => {
        state = {
            step: 1,
            selectedHospital: null,
            selectedDate: null,
            selectedDoctor: null,
            isLoggedIn: true,
            patientName: '',
            patientNIK: '',
            insuranceType: 'umum',
            bpjsNumber: ''
        };
        renderApp();
    });
}

function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Beranda</h2>
            <p>Selamat datang di RS Booking System. Kami menyediakan layanan pemesanan untuk rumah sakit terdekat.</p>
        </div>
    `;
}

function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Tentang Kami</h2>
            <p>Kami adalah sistem pemesanan yang memudahkan Anda untuk mendapatkan layanan kesehatan terbaik.</p>
        </div>
    `;
}

function renderContact() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Kontak</h2>
            <p>Untuk pertanyaan lebih lanjut, silakan hubungi kami di:</p>
            <p>Email: support@rsbooking.com</p>
            <p>Telepon: (021) 123-4567</p>
        </div>
    `;
}

// Initialize the app
renderApp();

