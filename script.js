const hospitals = [
    { id: 1, name: 'RSUD Sleman ' },
    { id: 2, name: 'RS Puri Husada' },
    { id: 3, name: 'RS JIH' },
];

const doctors = [
    { id: 1, name: 'dr. Ahmad', speciality: 'Poli Umum', schedule: '08:00 - 12:00', image: 'doctor1.jpg' },
    { id: 2, name: 'dr. Sarah', speciality: 'Poli Anak', schedule: '13:00 - 17:00', image: 'doctor2.jpg' },
    { id: 3, name: 'dr. Michael', speciality: 'Poli Gigi', schedule: '09:00 - 15:00', image: 'doctor3.jpg' },
];

let state ={
    step: 1,
    selectedHospital: null,
    selectedDate: null,
    selectedDoctor: null,
    isLoggedIn:false,
    patientName: '',
    patienNik: '',
    insuranceType:'umum',
    bpjsNumber:'',
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

// function renderAPP(){

// }

function renderHospitalSelection() {
    const hospitalList = document.getElementById('app');
    renderAPP.innerHTML = `
    <div class="card">
    <h2>Pilih Rumah Sakit</h2>
    <select id="hospitalSelect">
    <option value=" ">Pilih Rumah Sakit</option>
    ${hospitals.map(hospitals => `<option value="${hospital.id}">${hospital.name}</option>`).join('')}
    </select>)
    <button id="nextBtn" disabled>Lanjutkan</button>
    </select>
    </div>
    `;
    const hospitalSelect = document.getElementById('hospitalSelect');
    const nextBtn = document.getElementById('nextBtn')
    hospitalSelect.addEventListener('change', (e) => {
        state.selectedHospital = e.target.value;
        nextBtn.disabled = !state.selectedHospital;
    });
    nextBtn.addEventListener('click', ()=>{
        state.step = 2;
        renderApp();
    });
}


