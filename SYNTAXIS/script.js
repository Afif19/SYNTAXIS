// Mock data for admins, patients, and doctors
const admins = [
    { id: 1, username: 'admin_rsud_sleman', password: 'password123', hospitalId: 1 },
    { id: 2, username: 'admin_rs_puri_husada', password: 'password456', hospitalId: 2 },
    { id: 3, username: 'admin_rs_jih', password: 'password789', hospitalId: 3 },
];

const patients = [
    { id: 1, name: 'John Doe', nik: '1234567890', poli: 'Anak', doctor: 'dr. Ahmad Syafiq, Sp.A', date: '2023-06-15', hospitalId: 1 },
    { id: 2, name: 'Jane Smith', nik: '0987654321', poli: 'Penyakit Dalam', doctor: 'dr. Michael Tandra, Sp.PD', date: '2023-06-16', hospitalId: 2 },
    { id: 3, name: 'Bob Johnson', nik: '1122334455', poli: 'Mata', doctor: 'dr. Lisa Gunawan, Sp.M', date: '2023-06-17', hospitalId: 3 },
];

const doctors = [
    { 
        id: 1, 
        name: 'dr. Ahmad Syafiq, Sp.A', 
        speciality: 'Anak',
        subSpeciality: 'Gastro Hepatologi',
        schedule: {
            senin: '08:00 - 12:00',
            selasa: '13:00 - 17:00',
            rabu: '-',
            kamis: '09:00 - 14:00',
            jumat: '14:00 - 17:00',
            sabtu: '-',
            minggu: '-'
        },
        image: 'doctor1.jpg', 
        hospitalId: 1 
    },
    { 
        id: 2, 
        name: 'dr. Sarah Wijaya, Sp.A (K)', 
        speciality: 'Anak',
        subSpeciality: 'Neurologi',
        schedule: {
            senin: '13:00 - 17:00',
            selasa: '-',
            rabu: '08:00 - 12:00',
            kamis: '14:00 - 17:00',
            jumat: '09:00 - 13:00',
            sabtu: '-',
            minggu: '-'
        },
        image: 'doctor2.jpg', 
        hospitalId: 1 
    },
    { 
        id: 3, 
        name: 'dr. Michael Tandra, Sp.PD', 
        speciality: 'Penyakit Dalam',
        subSpeciality: 'Endokrinologi',
        schedule: {
            senin: '09:00 - 15:00',
            selasa: '14:00 - 18:00',
            rabu: '09:00 - 15:00',
            kamis: '-',
            jumat: '14:00 - 18:00',
            sabtu: '09:00 - 13:00',
            minggu: '-'
        },
        image: 'doctor3.jpg', 
        hospitalId: 2 
    },
    { 
        id: 4, 
        name: 'dr. Emily Suharto, Sp.OG', 
        speciality: 'Kandungan',
        subSpeciality: 'Fetomaternal',
        schedule: {
            senin: '10:00 - 14:00',
            selasa: '15:00 - 19:00',
            rabu: '-',
            kamis: '10:00 - 14:00',
            jumat: '15:00 - 19:00',
            sabtu: '-',
            minggu: '-'
        },
        image: 'doctor4.jpg', 
        hospitalId: 2 
    },
    { 
        id: 5, 
        name: 'dr. David Wijaya, Sp.B', 
        speciality: 'Bedah',
        subSpeciality: 'Bedah Umum',
        schedule: {
            senin: '08:00 - 16:00',
            selasa: '-',
            rabu: '08:00 - 16:00',
            kamis: '13:00 - 17:00',
            jumat: '-',
            sabtu: '09:00 - 13:00',
            minggu: '-'
        },
        image: 'doctor5.jpg', 
        hospitalId: 3 
    },
    { 
        id: 6, 
        name: 'dr. Lisa Gunawan, Sp.M', 
        speciality: 'Mata',
        subSpeciality: 'Kornea dan Penyakit Luar Mata',
        schedule: {
            senin: '11:00 - 15:00',
            selasa: '09:00 - 13:00',
            rabu: '14:00 - 18:00',
            kamis: '-',
            jumat: '11:00 - 15:00',
            sabtu: '-',
            minggu: '-'
        },
        image: 'doctor6.jpg', 
        hospitalId: 3 
    },
];

const hospitals = [
    { id: 1, name: 'RSUD Sleman' },
    { id: 2, name: 'RS Puri Husada' },
    { id: 3, name: 'RS JIH' },
];

const specialties = [
    'Semua Spesialis',
    'Anak',
    'Penyakit Dalam',
    'Bedah',
    'Kandungan',
    'Mata'
];

const subspecialties = [
    'Semua Subspesialis',
    'Gastro Hepatologi',
    'Neurologi',
    'Endokrinologi',
    'Fetomaternal',
    'Bedah Umum',
    'Kornea dan Penyakit Luar Mata'
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
    bpjsNumber: '',
    currentAdmin: null,
    adminLoggedIn: false,
    currentView: 'home'
};

function generateUniqueCode(speciality) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    let prefix;
    switch(speciality.toLowerCase()) {
        case 'anak':
            prefix = 'PA';
            break;
        case 'penyakit dalam':
            prefix = 'PD';
            break;
        case 'bedah':
            prefix = 'BD';
            break;
        case 'kandungan':
            prefix = 'OG';
            break;
        case 'mata':
            prefix = 'MT';
            break;
        default:
            prefix = 'XX';
    }
    return `${prefix}-${year}${month}${day}-${random}`;
}

function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    if (state.adminLoggedIn) {
        renderAdminInterface();
    } else {
        switch (state.currentView) {
            case 'home':
                renderHome();
                break;
            case 'services':
                renderUserInterface();
                break;
            case 'about':
                renderAbout();
                break;
            case 'contact':
                renderContact();
                break;
            default:
                renderHome();
        }
    }
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.target.getAttribute('data-view');
            state.currentView = view;
            renderApp();
        });
    });
}

function renderUserInterface() {
    switch (state.step) {
        case 1:
            renderHospitalSelection();
            break;
        case 2:
            renderDoctorSearch();
            break;
        case 3:
            renderCalendarAndDoctors();
            break;
        case 4:
            renderAuthPage();
            break;
        case 5:
            renderBookingForm();
            break;
        case 6:
            renderConfirmation();
            break;
    }
}

function renderAdminInterface() {
    const app = document.getElementById('app');
    if (!state.currentAdmin) {
        app.innerHTML = `
            <div class="card">
                <h2>Admin Login</h2>
                <input type="text" id="adminUsername" placeholder="Username" required>
                <input type="password" id="adminPassword" placeholder="Password" required>
                <button onclick="handleAdminLogin()">Login</button>
            </div>
        `;
    } else {
        app.innerHTML = `
            <div class="card">
                <h2>Welcome, ${state.currentAdmin.username}</h2>
                <p>Hospital: ${hospitals.find(h => h.id === state.currentAdmin.hospitalId).name}</p>
                <button onclick="renderAdminPatients()">Manage Patients</button>
                <button onclick="renderAdminDoctors()">Manage Doctors</button>
                <button onclick="logout()">Logout</button>
            </div>
        `;
    }
}

function renderAdminPatients() {
    const app = document.getElementById('app');
    const hospitalPatients = patients.filter(p => p.hospitalId === state.currentAdmin.hospitalId);
    app.innerHTML = `
        <div class="card">
            <h2>Patient Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>NIK</th>
                        <th>Poli</th>
                        <th>Doctor</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${hospitalPatients.map(patient => `
                        <tr>
                            <td>${patient.name}</td>
                            <td>${patient.nik}</td>
                            <td>${patient.poli}</td>
                            <td>${patient.doctor}</td>
                            <td>${patient.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="renderAdminInterface()">Back to Dashboard</button>
        </div>
    `;
}

function renderAdminDoctors() {
    const app = document.getElementById('app');
    const hospitalDoctors = doctors.filter(d => d.hospitalId === state.currentAdmin.hospitalId);
    app.innerHTML = `
        <div class="card">
            <h2>Doctor Management</h2>
            <button onclick="showAddDoctorForm()">Add New Doctor</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Sub-Speciality</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${hospitalDoctors.map(doctor => `
                        <tr>
                            <td>${doctor.name}</td>
                            <td>${doctor.speciality}</td>
                            <td>${doctor.subSpeciality}</td>
                            <td>
                                <button onclick="editDoctor(${doctor.id})">Edit</button>
                                <button onclick="deleteDoctor(${doctor.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="renderAdminInterface()">Back to Dashboard</button>
        </div>
    `;
}

function showAddDoctorForm() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Add New Doctor</h2>
            <input type="text" id="doctorName" placeholder="Doctor Name" required>
            <input type="text" id="speciality" placeholder="Speciality" required>
            <input type="text" id="subSpeciality" placeholder="Sub-Speciality" required>
            <h3>Schedule</h3>
            <input type="text" id="scheduleMonday" placeholder="Monday Schedule">
            <input type="text" id="scheduleTuesday" placeholder="Tuesday Schedule">
            <input type="text" id="scheduleWednesday" placeholder="Wednesday Schedule">
            <input type="text" id="scheduleThursday" placeholder="Thursday Schedule">
            <input type="text" id="scheduleFriday" placeholder="Friday Schedule">
            <input type="text" id="scheduleSaturday" placeholder="Saturday Schedule">
            <input type="text" id="scheduleSunday" placeholder="Sunday Schedule">
            <button onclick="addDoctor()">Add Doctor</button>
            <button onclick="renderAdminDoctors()">Cancel</button>
        </div>
    `;
}

function addDoctor() {
    const name = document.getElementById('doctorName').value;
    const speciality = document.getElementById('speciality').value;
    const subSpeciality = document.getElementById('subSpeciality').value;
    const schedule = {
        senin: document.getElementById('scheduleMonday').value || '-',
        selasa: document.getElementById('scheduleTuesday').value || '-',
        rabu: document.getElementById('scheduleWednesday').value || '-',
        kamis: document.getElementById('scheduleThursday').value || '-',
        jumat: document.getElementById('scheduleFriday').value || '-',
        sabtu: document.getElementById('scheduleSaturday').value || '-',
        minggu: document.getElementById('scheduleSunday').value || '-'
    };

    const newDoctor = {
        id: doctors.length + 1,
        name,
        speciality,
        subSpeciality,
        schedule,
        image: 'default-doctor.jpg',
        hospitalId: state.currentAdmin.hospitalId
    };

    doctors.push(newDoctor);
    renderAdminDoctors();
}

function editDoctor(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Edit Doctor</h2>
            <input type="text" id="doctorName" value="${doctor.name}" required>
            <input type="text" id="speciality" value="${doctor.speciality}" required>
            <input type="text" id="subSpeciality" value="${doctor.subSpeciality}" required>
            <h3>Schedule</h3>
            <input type="text" id="scheduleMonday" value="${doctor.schedule.senin}" placeholder="Monday Schedule">
            <input type="text" id="scheduleTuesday" value="${doctor.schedule.selasa}" placeholder="Tuesday Schedule">
            <input type="text" id="scheduleWednesday" value="${doctor.schedule.rabu}" placeholder="Wednesday Schedule">
            <input type="text" id="scheduleThursday" value="${doctor.schedule.kamis}" placeholder="Thursday Schedule">
            <input type="text" id="scheduleFriday" value="${doctor.schedule.jumat}" placeholder="Friday Schedule">
            <input type="text" id="scheduleSaturday" value="${doctor.schedule.sabtu}" placeholder="Saturday Schedule">
            <input type="text" id="scheduleSunday" value="${doctor.schedule.minggu}" placeholder="Sunday Schedule">
            <button onclick="updateDoctor(${doctorId})">Update Doctor</button>
            <button onclick="renderAdminDoctors()">Cancel</button>
        </div>
    `;
}

function updateDoctor(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    doctor.name = document.getElementById('doctorName').value;
    doctor.speciality = document.getElementById('speciality').value;
    doctor.subSpeciality = document.getElementById('subSpeciality').value;
    doctor.schedule = {
        senin: document.getElementById('scheduleMonday').value || '-',
        selasa: document.getElementById('scheduleTuesday').value || '-',
        rabu: document.getElementById('scheduleWednesday').value || '-',
        kamis: document.getElementById('scheduleThursday').value || '-',
        jumat: document.getElementById('scheduleFriday').value || '-',
        sabtu: document.getElementById('scheduleSaturday').value || '-',
        minggu: document.getElementById('scheduleSunday').value || '-'
    };

    renderAdminDoctors();
}

function deleteDoctor(doctorId) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        const index = doctors.findIndex(d => d.id === doctorId);
        if (index !== -1) {
            doctors.splice(index, 1);
            renderAdminDoctors();
        }
    }
}

function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Selamat Datang di RS Booking System</h2>
            <p>Sistem pemesanan online untuk rumah sakit terkemuka di Indonesia.</p>
            <button onclick="state.currentView = 'services'; renderApp();">Mulai Booking</button>
        </div>
    `;
}

function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Tentang Kami</h2>
            <p>RS Booking System adalah platform inovatif yang menghubungkan pasien dengan layanan kesehatan terbaik. Kami berkomitmen untuk menyediakan akses mudah ke perawatan kesehatan berkualitas tinggi.</p>
            <h3>Misi Kami</h3>
            <ul>
                <li>Menyederhanakan proses pemesanan layanan kesehatan</li>
                <li>Meningkatkan akses ke perawatan kesehatan berkualitas</li>
                <li>Mengoptimalkan pengalaman pasien dan penyedia layanan kesehatan</li>
            </ul>
        </div>
    `;
}

function renderContact() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <h2>Hubungi Kami</h2>
            <p>Kami siap membantu Anda dengan pertanyaan atau masukan yang Anda miliki.</p>
            <div class="contact-info">
                <p><strong>Email:</strong> info@rsbooking.com</p>
                <p><strong>Telepon:</strong> (021) 123-4567</p>
                <p><strong>Alamat:</strong> Jl. Kesehatan No. 1, Jakarta Pusat</p>
            </div>
            <form id="contactForm" class="contact-form">
                <input type="text" id="name" placeholder="Nama Anda" required>
                <input type="email" id="email" placeholder="Email Anda" required>
                <textarea id="message" placeholder="Pesan Anda" required></textarea>
                <button type="submit">Kirim Pesan</button>
            </form>
        </div>
    `;

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim.');
        this.reset();
    });
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
            <button id="nextBtn" disabled>Lanjutkan</button>
        </div>
    `;

    const hospitalSelect = document.getElementById('hospitalSelect');
    const nextBtn = document.getElementById('nextBtn');

    hospitalSelect.addEventListener('change', (e) => {
        state.selectedHospital = e.target.value;
        nextBtn.disabled = !state.selectedHospital;
    });

    nextBtn.addEventListener('click', () => {
        if (!state.selectedHospital) return;
        state.step = 2;
        renderApp();
    });
}

function renderDoctorSearch() {
    const app = document.getElementById('app');
    const selectedHospital = hospitals.find(h => h.id == state.selectedHospital);
    app.innerHTML = `
        <div class="card">
            <h2>Layanan di ${selectedHospital.name}</h2>
            <div class="search-container">
                <div class="search-wrapper">
                    <input type="text" placeholder="Cari nama dokter Anda disini" id="doctorSearch">
                    <select id="specialtySelect">
                        ${specialties.map(specialty => 
                            `<option value="${specialty}">${specialty}</option>`
                        ).join('')}
                    </select>
                    <select id="subspecialtySelect">
                        ${subspecialties.map(subspecialty => 
                            `<option value="${subspecialty}">${subspecialty}</option>`
                        ).join('')}
                    </select>
                    <button id="searchBtn" class="search-btn">CARI</button>
                </div>
            </div>
            <div class="content-container">
                <h3>Cari Jadwal Dokter Telekonsultasi di ${selectedHospital.name}</h3>
                <p class="subtitle">Untuk mencari dokter anda dapat memilih nama dokter atau mencari berdasarkan spesialis dan atau subspesialis</p>
                <div id="doctorsList" class="doctors-list">
                    ${renderDoctorCards()}
                </div>
            </div>
            <button id="backBtn" class="back-btn">Kembali</button>
        </div>
    `;

    setupSearchHandlers();
    document.getElementById('backBtn').addEventListener('click', () => {
        state.step = 1;
        renderApp();
    });
}

function renderDoctorCards(filters = {}) {
    const filteredDoctors = doctors.filter(doctor => {
        if (doctor.hospitalId != state.selectedHospital) {
            return false;
        }
        if (filters.search) {
            if (!doctor.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
        }
        if (filters.specialty && filters.specialty !== 'Semua Spesialis') {
            if (doctor.speciality !== filters.specialty) {
                return false;
            }
        }
        if (filters.subspecialty && filters.subspecialty !== 'Semua Subspesialis') {
            if (doctor.subSpeciality !== filters.subspecialty) {
                return false;
            }
        }
        return true;
    });

    return filteredDoctors.map(doctor => `
        <div class="doctor-profile-card">
            <div class="doctor-info">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-image">
                <div class="doctor-details">
                    <h2>${doctor.name}</h2>
                    <div class="specialty-tags">
                        <span class="tag tag-primary">${doctor.speciality}</span>
                        <span class="tag tag-secondary">${doctor.subSpeciality}</span>
                    </div>
                </div>
            </div>
            <div class="schedule-table">
                <table>
                    <thead>
                        <tr>
                            <th>Senin</th>
                            <th>Selasa</th>
                            <th>Rabu</th>
                            <th>Kamis</th>
                            <th>Jumat</th>
                            <th>Sabtu</th>
                            <th>Minggu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${doctor.schedule.senin}</td>
                            <td>${doctor.schedule.selasa}</td>
                            <td>${doctor.schedule.rabu}</td>
                            <td>${doctor.schedule.kamis}</td>
                            <td>${doctor.schedule.jumat}</td>
                            <td>${doctor.schedule.sabtu}</td>
                            <td>${doctor.schedule.minggu}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-actions">
                <button class="btn-profile" onclick="selectDoctor(${doctor.id})">PILIH DOKTER</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function setupSearchHandlers() {
    const searchInput = document.getElementById('doctorSearch');
    const specialtySelect = document.getElementById('specialtySelect');
    const subspecialtySelect = document.getElementById('subspecialtySelect');
    const searchBtn = document.getElementById('searchBtn');
    const doctorsList = document.getElementById('doctorsList');

    const performSearch = () => {
        const filters = {
            search: searchInput.value,
            specialty: specialtySelect.value,
            subspecialty: subspecialtySelect.value
        };
        doctorsList.innerHTML = renderDoctorCards(filters);
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function selectDoctor(doctorId) {
    state.selectedDoctor = doctorId;
    state.step = 3;
    renderApp();
}

function startChat(doctorId) {
    // Implement chat functionality
    console.log('Starting chat with doctor:', doctorId);
}

function renderCalendarAndDoctors() {
    const app = document.getElementById('app');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const selectedDoctor = doctors.find(d => d.id == state.selectedDoctor);
    const selectedHospital = hospitals.find(h => h.id == state.selectedHospital);

    app.innerHTML = `
        <div class="card">
            <h2>Pilih Tanggal Konsultasi di ${selectedHospital.name}</h2>
            <div class="calendar-and-schedule">
                <div class="calendar-container">
                    <div id="calendar" class="calendar"></div>
                </div>
                <div class="schedule-container">
                    <h3>Jadwal Dokter</h3>
                    <div class="doctor-schedule">
                        <img src="${selectedDoctor.image}" alt="${selectedDoctor.name}" class="doctor-avatar">
                        <div class="doctor-info">
                            <h4>${selectedDoctor.name}</h4>
                            <p>${selectedDoctor.speciality} - ${selectedDoctor.subSpeciality}</p>
                        </div>
                    </div>
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>Senin</th>
                                <th>Selasa</th>
                                <th>Rabu</th>
                                <th>Kamis</th>
                                <th>Jumat</th>
                                <th>Sabtu</th>
                                <th>Minggu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${selectedDoctor.schedule.senin}</td>
                                <td>${selectedDoctor.schedule.selasa}</td>
                                <td>${selectedDoctor.schedule.rabu}</td>
                                <td>${selectedDoctor.schedule.kamis}</td>
                                <td>${selectedDoctor.schedule.jumat}</td>
                                <td>${selectedDoctor.schedule.sabtu}</td>
                                <td>${selectedDoctor.schedule.minggu}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button id="bookBtn" disabled>Lanjutkan Booking</button>
            <button id="backBtn" class="back-btn">Kembali</button>
        </div>
    `;

    renderCalendar(currentYear, currentMonth);

    const bookBtn = document.getElementById('bookBtn');
    const backBtn = document.getElementById('backBtn');

    bookBtn.addEventListener('click', () => {
        if (!state.selectedDate || !isDateAvailable(selectedDoctor.schedule, state.selectedDate)) {
            alert('Jadwal dokter tidak tersedia pada tanggal yang dipilih.');
            return;
        }
        state.step = 4;
        renderApp();
    });

    backBtn.addEventListener('click', () => {
        state.step = 2;
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
            document.getElementById('bookBtn').disabled = !state.selectedDate;
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
        authBtn.disabled = !isValid;
    };

    emailInput.addEventListener('input', validateAuthFields);
    passwordInput.addEventListener('input', validateAuthFields);
    if (!state.isLoggedIn) {
        confirmPasswordInput.addEventListener('input', validateAuthFields);
    }

    authBtn.addEventListener('click', () => {
        state.isLoggedIn = true;
        state.step = 5;
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
    const selectedDoctor = doctors.find(d => d.id == state.selectedDoctor);
    const selectedHospital = hospitals.find(h => h.id == state.selectedHospital);
    app.innerHTML = `
        <div class="card">
            <h2>Booking Form - ${selectedHospital.name}</h2>
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
                <p>Rumah Sakit: ${selectedHospital.name}</p>
                <p>Poli: ${selectedDoctor.speciality}</p>
                <p>Dokter: ${selectedDoctor.name}</p>
                <p>Tanggal: ${state.selectedDate}</p>
            </div>
            <button id="confirmBtn" disabled>Konfirmasi Booking</button>
            <button id="backBtn" class="back-btn">Kembali</button>
        </div>
    `;

    const patientNameInput = document.getElementById('patientName');
    const patientNIKInput = document.getElementById('patientNIK');
    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');

    const validateBookingFields = () => {
        confirmBtn.disabled = !patientNameInput.value || !patientNIKInput.value;
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
        state.step = 6;
        renderApp();
    });

    backBtn.addEventListener('click', () => {
        state.step = 3;
        renderApp();
    });
}

function renderConfirmation() {
    const app = document.getElementById('app');
    const selectedDoctor = doctors.find(d => d.id == state.selectedDoctor);
    const selectedHospital = hospitals.find(h => h.id == state.selectedHospital);
    const uniqueCode = generateUniqueCode(selectedDoctor.speciality);
    app.innerHTML = `
        <div class="card">
            <h2>Booking Confirmed</h2>
            <p>Terima kasih, ${state.patientName}!</p>
            <p>Booking Anda telah dikonfirmasi untuk:</p>
            <p>Rumah Sakit: ${selectedHospital.name}</p>
            <p>Poli: ${selectedDoctor.speciality}</p>
            <p>Dokter: ${selectedDoctor.name}</p>
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
            isLoggedIn: false,
            patientName: '',
            patientNIK: '',
            insuranceType: 'umum',
            bpjsNumber: '',
            currentAdmin: null,
            adminLoggedIn: false,
            currentView: 'home'
        };
        renderApp();
    });
}

function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        state.currentAdmin = admin;
        state.adminLoggedIn = true;
        state.view = 'dashboard';
        renderApp();
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    state.currentAdmin = null;
    state.adminLoggedIn = false;
    renderApp();
}

// New function to check if the selected date is available
function isDateAvailable(schedule, selectedDate) {
    const date = new Date(selectedDate);
    const day = date.toLocaleString('id-ID', { weekday: 'long' }).toLowerCase(); // Get the day in Indonesian

    // Check if the schedule for the selected day is available
    return schedule[day] !== '-';
}

// Initialize the app
renderApp();

