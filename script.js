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

function renderAPP(){

}

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


