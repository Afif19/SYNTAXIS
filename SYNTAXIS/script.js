// Mock data for admins, patients, and doctors
const admins = [
    {
      id: 1,
      username: "admin_rsud_sleman",
      password: "password123",
      hospitalId: 1,
    },
    {
      id: 2,
      username: "admin_rs_puri_husada",
      password: "password456",
      hospitalId: 2,
    },
    { id: 3, username: "admin_rs_jih", password: "password789", hospitalId: 3 },
  ];
  
  const patients = [
    {
      id: 1,
      name: "John Doe",
      nik: "1234567890",
      poli: "Anak",
      doctor: "dr. Ahmad Syafiq, Sp.A",
      date: "2023-06-15",
      hospitalId: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      nik: "0987654321",
      poli: "Penyakit Dalam",
      doctor: "dr. Michael Tandra, Sp.PD",
      date: "2023-06-16",
      hospitalId: 2,
    },
    {
      id: 3,
      name: "Bob Johnson",
      nik: "1122334455",
      poli: "Mata",
      doctor: "dr. Lisa Gunawan, Sp.M",
      date: "2023-06-17",
      hospitalId: 3,
    },
  ];
  
  const doctors = [
    {
      id: 1,
      name: "dr. Ahmad Syafiq, Sp.A",
      speciality: "Anak",
      subSpeciality: "Gastro Hepatologi",
      schedule: {
        senin: "08:00 - 12:00",
        selasa: "13:00 - 17:00",
        rabu: "-",
        kamis: "09:00 - 14:00",
        jumat: "14:00 - 17:00",
        sabtu: "-",
        minggu: "-",
      },
      image: "doctor1.jpg",
      hospitalId: 1,
    },
    {
      id: 2,
      name: "dr. Sarah Wijaya, Sp.A (K)",
      speciality: "Anak",
      subSpeciality: "Neurologi",
      schedule: {
        senin: "13:00 - 17:00",
        selasa: "-",
        rabu: "08:00 - 12:00",
        kamis: "14:00 - 17:00",
        jumat: "09:00 - 13:00",
        sabtu: "-",
        minggu: "-",
      },
      image: "doctor2.jpg",
      hospitalId: 1,
    },
    {
      id: 3,
      name: "dr. Michael Tandra, Sp.PD",
      speciality: "Penyakit Dalam",
      subSpeciality: "Endokrinologi",
      schedule: {
        senin: "09:00 - 15:00",
        selasa: "14:00 - 18:00",
        rabu: "09:00 - 15:00",
        kamis: "-",
        jumat: "14:00 - 18:00",
        sabtu: "09:00 - 13:00",
        minggu: "-",
      },
      image: "doctor3.jpg",
      hospitalId: 2,
    },
    {
      id: 4,
      name: "dr. Emily Suharto, Sp.OG",
      speciality: "Kandungan",
      subSpeciality: "Fetomaternal",
      schedule: {
        senin: "10:00 - 14:00",
        selasa: "15:00 - 19:00",
        rabu: "-",
        kamis: "10:00 - 14:00",
        jumat: "15:00 - 19:00",
        sabtu: "-",
        minggu: "-",
      },
      image: "doctor4.jpg",
      hospitalId: 2,
    },
    {
      id: 5,
      name: "dr. David Wijaya, Sp.B",
      speciality: "Bedah",
      subSpeciality: "Bedah Umum",
      schedule: {
        senin: "08:00 - 16:00",
        selasa: "-",
        rabu: "08:00 - 16:00",
        kamis: "13:00 - 17:00",
        jumat: "-",
        sabtu: "09:00 - 13:00",
        minggu: "-",
      },
      image: "doctor5.jpg",
      hospitalId: 3,
    },
    {
      id: 6,
      name: "dr. Lisa Gunawan, Sp.M",
      speciality: "Mata",
      subSpeciality: "Kornea dan Penyakit Luar Mata",
      schedule: {
        senin: "11:00 - 15:00",
        selasa: "09:00 - 13:00",
        rabu: "14:00 - 18:00",
        kamis: "-",
        jumat: "11:00 - 15:00",
        sabtu: "-",
        minggu: "-",
      },
      image: "doctor6.jpg",
      hospitalId: 3,
    },
  ];
  
  const hospitals = [
    { id: 1, name: "RSUD Sleman" },
    { id: 2, name: "RS Puri Husada" },
    { id: 3, name: "RS JIH" },
  ];
  
  const specialties = [
    "Semua Spesialis",
    "Anak",
    "Penyakit Dalam",
    "Bedah",
    "Kandungan",
    "Mata",
  ];
  
  const subspecialties = [
    "Semua Subspesialis",
    "Gastro Hepatologi",
    "Neurologi",
    "Endokrinologi",
    "Fetomaternal",
    "Bedah Umum",
    "Kornea dan Penyakit Luar Mata",
  ];
  
  let state = {
    step: 1,
    selectedHospital: null,
    selectedDate: null,
    selectedDoctor: null,
    isLoggedIn: false,
    patientName: "",
    patientNIK: "",
    insuranceType: "umum",
    bpjsNumber: "",
    currentAdmin: null,
    adminLoggedIn: false, // Changed to false initially
    currentView: "home",
    adminView: "login", // New property for admin view state
  };
  
  localStorage.setItem("state", JSON.stringify(state));
  
  function updateStateProperty(key, value) {
    let userData = JSON.parse(localStorage.getItem("state")) || {};
    userData[key] = value;
    localStorage.setItem("state", JSON.stringify(userData));
  }
  
  function generateUniqueCode(speciality) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
  
    let prefix;
    switch (speciality.toLowerCase()) {
      case "anak":
        prefix = "PA";
        break;
      case "penyakit dalam":
        prefix = "PD";
        break;
      case "bedah":
        prefix = "BD";
        break;
      case "kandungan":
        prefix = "OG";
        break;
      case "mata":
        prefix = "MT";
        break;
      default:
        prefix = "XX";
    }
    return `${prefix}-${year}${month}${day}-${random}`;
  }
  
  function renderApp() {
    const app = document.getElementById("app");
    let getData = JSON.parse(localStorage.getItem("state"));
    app.innerHTML = "";
  
    if (getData.adminLoggedIn) {
      renderAdminDashboard();
    } else {
      switch (state.currentView) {
        case "home":
          renderHome();
          break;
        case "services":
          renderUserInterface();
          break;
        case "about":
          renderAbout();
          break;
        case "contact":
          renderContact();
          break;
        case "admin":
          renderAuthPage();
          break;
        default:
          renderHome();
      }
    }
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = e.target.getAttribute("data-view");
        state.currentView = view;
        renderApp();
      });
    });
  }
  
  function renderUserInterface() {
    let getData = JSON.parse(localStorage.getItem("state"));
    updateStateProperty("adminLoggedIn", false);
  
    switch (getData.step) {
      case 1:
        renderHospitalSelection();
        break;
      case 2:
        renderAuthPage();
        break;
      case 3:
        renderCalendarAndDoctors();
        break;
      case 4:
        renderDoctorSearch();
        break;
      case 5:
        renderBookingForm();
        break;
      case 6:
        renderConfirmation();
        break;
    }
  }
  
  let users = [
    {
      username: '',
      password: '',
      isLogin: false
    }
  ];
  
  localStorage.setItem('users', JSON.stringify(users));
  
  function renderNavbar() {
    const users = JSON.parse(localStorage.getItem("state")) || []; // Ambil data dari 'users' di localStorage
    const nav = document.getElementById("nav");
  
    // Cari user yang sedang login
    if (users.isLoggedIn == true) {
      nav.innerHTML = `
                      <li><a href="#" data-view="home">Beranda</a></li>
                      <li><a href="#" data-view="services">Layanan</a></li>
                      <li><a href="#" data-view="about">Tentang Kami</a></li>
                      <li><a href="#" data-view="contact">Kontak</a></li>
                      <li class="btn-navbar dropdown">
                        <img 
                          src="./img/default_user.svg" 
                          alt="Profile Picture" 
                          class="profile-pic" 
                          onclick="toggleDropdown()"
                        />
                        <div id="dropdownMenu" class="dropdown-menu">
                          <button class="dropdown-item" onclick="renderUserProfile()">Profil</button>
                          <button class="dropdown-item" onclick="logoutUser()">Logout</button>
                        </div>
                      </li>
                    `;
    } else {
      nav.innerHTML = `<li><a href="#" data-view="home">Beranda</a></li>
                      <li><a href="#" data-view="services">Layanan</a></li>
                      <li><a href="#" data-view="about">Tentang Kami</a></li>
                      <li><a href="#" data-view="contact">Kontak</a></li>
                      <li><a href="#" data-view="admin">Login</a></li>`;
    }
  }
  
  function renderNavbarAdmin() {
    const log = JSON.parse(localStorage.getItem("state"));
    const nav = document.getElementById("nav");
  
    if (log.adminLoggedIn == true) {
      nav.innerHTML = `
                      <li><button class="btn-navbar" onclick="renderAdminHome()">Beranda</button></li>
                      <li><button class="btn-navbar" onclick="renderPatientStatistics()">Statistik Pasien</button></li>
                      <li><button class="btn-navbar" onclick="renderDoctorManagement()">Manajemen Dokter</button></li>
                      <li><button class="btn-navbar" onclick="renderScheduleManagement()">Manajemen Jadwal</button></li>
                      <li class="btn-navbar dropdown">
                        <img 
                          src="./img/default_user.svg" 
                          alt="Profile Picture" 
                          class="profile-pic" 
                          onclick="toggleDropdown()"
                        />
                        <div id="dropdownMenu" class="dropdown-menu">
                          <button class="dropdown-item" onclick="renderAdminProfile()">Profil</button>
                          <button class="dropdown-item" onclick="logout()">Logout</button>
                        </div>
                      </li>
                    `;
    } else {
      nav.innerHTML = `<li><a href="#" data-view="home">Beranda</a></li>
                      <li><a href="#" data-view="services">Layanan</a></li>
                      <li><a href="#" data-view="about">Tentang Kami</a></li>
                      <li><a href="#" data-view="contact">Kontak</a></li>
                      <li><a href="#" data-view="admin">Login</a></li>`;
    }
    const btn = document.getElementsByClassName('btn');
  }
  
  function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("show");
  }
  
  function toggleProfileMenu() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.classList.toggle("hidden");
  }
  
  function renderAdminDashboard() {
    const app = document.getElementById("app");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospital = hospitals.find((h) => h.id === getData.currentAdmin);
    const admin = admins.find((h) => h.id === getData.id_admin);
    renderNavbarAdmin();
  
    app.innerHTML = `
          <div class="admin-dashboard">
              <div>
                  <h2>Selamat Datang, ${admin.username}</h2>
              </div>
              <div id="adminContent"></div>
          </div>
      `;
    renderAdminHome(); // Menampilkan konten beranda admin secara default
  }
  
  function renderPatientStatistics() {
    const adminContent = document.getElementById("adminContent");
    let getData = JSON.parse(localStorage.getItem("state"));
    // const hospitalPatients = patients.filter((p) => p.hospitalId == 1);
    const hospitalPatients = patients.filter((p) => p.hospitalId == getData.currentAdmin);
    const poliCounts = hospitalPatients.reduce((acc, patient) => {
      acc[patient.poli] = (acc[patient.poli] || 0) + 1;
      return acc;
    }, {});
  
    let statsHTML = `<div class="statistics-container"><h3>Statistik Pasien</h3><ul class="statistics-list">`;
    for (const [poli, count] of Object.entries(poliCounts)) {
      statsHTML += `<li>${poli}: ${count} pasien</li>`;
    }
    statsHTML += "</ul></div>";
  
    adminContent.innerHTML = statsHTML;
  }
  
  function renderDoctorManagement() {
    const adminContent = document.getElementById("adminContent");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospitalDoctors = doctors.filter((d) => d.hospitalId === getData.currentAdmin);
  
    let doctorListHTML = `
          <div class="mater">
            <h3>Manajemen Dokter</h3>
            <div>
              <button onclick="showAddDoctorForm()">Tambah Dokter Baru</button>
            </div>
          </div>
          <table width="100%">
              <thead>
                  <tr>
                      <th class="border-def">Nama</th>
                      <th class="border-def">Spesialisasi</th>
                      <th class="border-def">Sub-Spesialisasi</th>
                      <th class="border-def">Aksi</th>
                  </tr>
              </thead>
              <tbody>
      `;
  
    for (const doctor of hospitalDoctors) {
      doctorListHTML += `
              <tr>
                  <td>${doctor.name}</td>
                  <td>${doctor.speciality}</td>
                  <td>${doctor.subSpeciality}</td>
                  <td class="btn-table" style="margin-top:0;">
                    <div class="btn-table">
                      <button onclick="deleteDoctor(${doctor.id})">Hapus</button>
                      <button onclick="editDoctor(${doctor.id})">Edit</button>
                    </div>
                  </td>
              </tr>
          `;
    }
    doctorListHTML += "</tbody></table>";
  
    adminContent.innerHTML = doctorListHTML;
  }
  
  function renderScheduleManagement() {
    const adminContent = document.getElementById("adminContent");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospitalDoctors = doctors.filter((d) => d.hospitalId === getData.currentAdmin);
  
    let scheduleHTML = `
          <h3>Manajemen Jadwal</h3>
          <table>
              <thead>
                  <tr>
                      <th>Nama Dokter</th>
                      <th>Senin</th>
                      <th>Selasa</th>
                      <th>Rabu</th>
                      <th>Kamis</th>
                      <th>Jumat</th>
                      <th>Sabtu</th>
                      <th>Minggu</th>
                      <th>Aksi</th>
                  </tr>
              </thead>
              <tbody>
      `;
  
    for (const doctor of hospitalDoctors) {
      scheduleHTML += `
              <tr>
                  <td>${doctor.name}</td>
                  <td>${doctor.schedule.senin}</td>
                  <td>${doctor.schedule.selasa}</td>
                  <td>${doctor.schedule.rabu}</td>
                  <td>${doctor.schedule.kamis}</td>
                  <td>${doctor.schedule.jumat}</td>
                  <td>${doctor.schedule.sabtu}</td>
                  <td>${doctor.schedule.minggu}</td>
                  <td>
                      <button onclick="editSchedule(${doctor.id})">Edit Jadwal</button>
                  </td>
              </tr>
          `;
    }
    scheduleHTML += "</tbody></table>";
  
    adminContent.innerHTML = scheduleHTML;
  }
  
  function showAddDoctorForm() {
    const adminContent = document.getElementById("adminContent");
    adminContent.innerHTML = `
          <h3>Tambah Dokter Baru</h3>
          <form id="addDoctorForm">
              <input type="text" id="doctorName" placeholder="Nama Dokter" required>
              <input type="text" id="doctorSpeciality" placeholder="Spesialisasi" required>
              <input type="text" id="doctorSubSpeciality" placeholder="Sub-Spesialisasi" required>
              <button type="submit">Tambah Dokter</button>
          </form>
          <button onclick="renderDoctorManagement()">Batal</button>
      `;
  
    document
      .getElementById("addDoctorForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        addDoctor();
      });
  }
  
  function addDoctor() {
    const name = document.getElementById("doctorName").value;
    let getData = JSON.parse(localStorage.getItem("state"));
    const speciality = document.getElementById("doctorSpeciality").value;
    const subSpeciality = document.getElementById("doctorSubSpeciality").value;
  
    const newDoctor = {
      id: doctors.length + 1,
      name,
      speciality,
      subSpeciality,
      schedule: {
        senin: "-",
        selasa: "-",
        rabu: "-",
        kamis: "-",
        jumat: "-",
        sabtu: "-",
        minggu: "-",
      },
      image: "default-doctor.jpg",
  
      hospitalId: getData.currentAdmin,
    };
  
    doctors.push(newDoctor);
    renderDoctorManagement();
  }
  
  function editDoctor(doctorId) {
    const doctor = doctors.find((d) => d.id === doctorId);
    const adminContent = document.getElementById("adminContent");
    adminContent.innerHTML = `
          <h3>Edit Dokter</h3>
          <form id="editDoctorForm">
              <input type="text" id="doctorName" value="${doctor.name}" required>
              <input type="text" id="doctorSpeciality" value="${doctor.speciality}" required>
              <input type="text" id="doctorSubSpeciality" value="${doctor.subSpeciality}" required>
              <button type="submit">Update Dokter</button>
          </form>
          <button onclick="renderDoctorManagement()">Batal</button>
      `;
  
    document
      .getElementById("editDoctorForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        updateDoctor(doctorId);
      });
  }
  
  function updateDoctor(doctorId) {
    const doctor = doctors.find((d) => d.id === doctorId);
    doctor.name = document.getElementById("doctorName").value;
    doctor.speciality = document.getElementById("doctorSpeciality").value;
    doctor.subSpeciality = document.getElementById("doctorSubSpeciality").value;
    renderDoctorManagement();
  }
  
  function deleteDoctor(doctorId) {
    if (confirm("Apakah Anda yakin ingin menghapus dokter ini?")) {
      const index = doctors.findIndex((d) => d.id === doctorId);
      if (index !== -1) {
        doctors.splice(index, 1);
        renderDoctorManagement();
      }
    }
  }
  
  function editSchedule(doctorId) {
    const doctor = doctors.find((d) => d.id === doctorId);
    const adminContent = document.getElementById("adminContent");
    adminContent.innerHTML = `
          <h3>Edit Jadwal - ${doctor.name}</h3>
          <form id="editScheduleForm">
              <label for="senin">Senin:</label>
              <input type="text" id="senin" value="${doctor.schedule.senin}">
              <label for="selasa">Selasa:</label>
              <input type="text" id="selasa" value="${doctor.schedule.selasa}">
              <label for="rabu">Rabu:</label>
              <input type="text" id="rabu" value="${doctor.schedule.rabu}">
              <label for="kamis">Kamis:</label>
              <input type="text" id="kamis" value="${doctor.schedule.kamis}">
              <label for="jumat">Jumat:</label>
              <input type="text" id="jumat" value="${doctor.schedule.jumat}">
              <label for="sabtu">Sabtu:</label>
              <input type="text" id="sabtu" value="${doctor.schedule.sabtu}">
              <label for="minggu">Minggu:</label>
              <input type="text" id="minggu" value="${doctor.schedule.minggu}">
              <button type="submit">Update Jadwal</button>
          </form>
          <button onclick="renderScheduleManagement()">Batal</button>
      `;
  
    document
      .getElementById("editScheduleForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        updateSchedule(doctorId);
      });
  }
  
  function updateSchedule(doctorId) {
    const doctor = doctors.find((d) => d.id === doctorId);
    doctor.schedule = {
      senin: document.getElementById("senin").value,
      selasa: document.getElementById("selasa").value,
      rabu: document.getElementById("rabu").value,
      kamis: document.getElementById("kamis").value,
      jumat: document.getElementById("jumat").value,
      sabtu: document.getElementById("sabtu").value,
      minggu: document.getElementById("minggu").value,
    };
    renderScheduleManagement();
  }
  
  function renderAdminPatients() {
    const app = document.getElementById("app");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospitalPatients = patients.filter(
      (p) => p.hospitalId === getData.currentAdmin.hospitalId
    );
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
                      ${hospitalPatients
        .map(
          (patient) => `
                          <tr>
                              <td>${patient.name}</td>
                              <td>${patient.nik}</td>
                              <td>${patient.poli}</td>
                              <td>${patient.doctor}</td>
                              <td>${patient.date}</td>
                          </tr>
                      `
        )
        .join("")}
                  </tbody>
              </table>
              <button onclick="renderAdminInterface()">Back to Dashboard</button>
          </div>
      `;
  }
  
  function renderAdminDoctors() {
    const app = document.getElementById("app");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospitalDoctors = doctors.filter(
      (d) => d.hospitalId === getData.currentAdmin.hospitalId
    );
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
                      ${hospitalDoctors
        .map(
          (doctor) => `
                          <tr>
                              <td>${doctor.name}</td>
                              <td>${doctor.speciality}</td>
                              <td>${doctor.subSpeciality}</td>
                              <td>
                                  <button onclick="editDoctor(${doctor.id})">Edit</button>
                                  <button onclick="deleteDoctor(${doctor.id})">Delete</button>
                              </td>
                          </tr>
                      `
        )
        .join("")}
                  </tbody>
              </table>
              <button onclick="renderAdminInterface()">Back to Dashboard</button>
          </div>
      `;
  }
  
  function renderAdminProfile() {
    const adminContent = document.getElementById("adminContent");
    let getData = JSON.parse(localStorage.getItem("state"));
    const admin = admins.find((a) => a.id === getData.id_admin);
  
    adminContent.innerHTML = `
      <div class="admin-profile-container">
        <div class="admin-profile-header">
          <img src="./img/default_user.svg" alt="Admin Photo">
          <h3>Profil Admin</h3>
        </div>
        <div class="admin-profile-details">
          <p><span>Nama:</span> ${admin.username}</p>
          <p><span>Role:</span> ${admin.role || "Administrator"}</p>
        </div>
      </div>
    `;
  }
  
  function renderHome() {
    const app = document.getElementById("app");
    updateStateProperty("adminLoggedIn", false);
    app.innerHTML = `
          <div class="card h-card">
            <h2 style="text-align:center; margin:0; color:white;">Selamat Datang di RS Booking System</h2>
            <div class="home">
              <p style="margin-bottom:22px; color:white;">Sistem pemesanan online untuk rumah sakit terkemuka di Indonesia.</p>
              <button style="width: 30%" onclick="state.currentView = 'services'; renderApp();">Mulai Booking</button>
            </div>
          </div>
      `;
  }
  
  function renderUserProfile() {
    const app = document.getElementById("app");
    const getData = JSON.parse(localStorage.getItem("state"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const bookingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];
  
    // Ambil data user yang sedang login
    const user = users.find((u) => u.username === getData.username);
  
    if (!user) {
      app.innerHTML = "<p>Data pengguna tidak ditemukan.</p>";
      return;
    }
  
    // Cari booking yang sesuai dengan username
    const userBookings = bookingHistory.filter(
      (booking) => booking.username === user.username
    );
  
    // Generate HTML untuk daftar booking
    const bookingList = userBookings.length
      ? userBookings
          .map((booking, index) => {
            const doctor = doctors.find((doc) => doc.id === booking.selectedDoctor);
            const hospital = hospitals.find(
              (hosp) => hosp.id === parseInt(booking.selectedHospital, 10)
            );
  
            return `
              <div class="booking-item" style="margin: 15px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                <h4 style="margin: 0 0 10px; font-size: 1.1rem; color: #333;">Booking ${index + 1}</h4>
                <p><strong>NIK:</strong> ${booking.patientNIK || '-'}</p>
                <p><strong>Nama:</strong> ${booking.patientName || '-'}</p>
                <p><strong>Tanggal:</strong> ${booking.selectedDate || '-'}</p>
                <p><strong>No BPJS:</strong> ${booking.bpjsNumber || '-'}</p>
                <p><strong>Rumah Sakit:</strong> ${hospital?.name || '-'}</p>
                <p><strong>Dokter:</strong> ${doctor?.name || '-'} (${doctor?.speciality || '-'})</p>
              </div>
            `;
          })
          .join("")
      : "<p>Tidak ada riwayat booking.</p>";
  
    // Tampilkan profil dan riwayat booking
    app.innerHTML = `
      <div class="user-profile" style="font-family: Arial, sans-serif;">
        <h3 style="font-size: 1.5rem; color: #008a95;">Profil Pengguna</h3>
        <div class="profile-card" style="display: flex; align-items: center; margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
          <img src="${user.profilePicture || './img/default_user.svg'}" alt="Foto Profil" class="profile-pic-large" style="border-radius: 50%; margin-right: 15px;">
          <div class="profile-details" style="flex-grow: 1;">
            <p style="margin: 0; font-size: 1.1rem;"><strong>Username:</strong> ${user.username || '-'}</p>
          </div>
        </div>
        <div class="booking-history">
          <h3 style="font-size: 1.5rem; color: #008a95; margin-bottom: 15px;">Riwayat Booking</h3>
          ${bookingList}
        </div>
      </div>
    `;
  }
  
  
  // function editUserProfile() {
  //   const app = document.getElementById("app");
  //   let getData = JSON.parse(localStorage.getItem("state"));
  //   const user = users.find((u) => u.id === getData.id_user);
  
  //   app.innerHTML = `
  //     <div class="edit-profile">
  //       <h3>Edit Profil</h3>
  //       <form onsubmit="saveUserProfile(event)">
  //         <div class="form-group">
  //           <label for="name">Nama:</label>
  //           <input type="text" id="name" value="${user.name}" required>
  //         </div>
  //         <div class="form-group">
  //           <label for="email">Email:</label>
  //           <input type="email" id="email" value="${user.email}" required>
  //         </div>
  //         <div class="form-group">
  //           <label for="phone">No. Telepon:</label>
  //           <input type="text" id="phone" value="${user.phone || ''}">
  //         </div>
  //         <div class="form-group">
  //           <label for="address">Alamat:</label>
  //           <textarea id="address" rows="3">${user.address || ''}</textarea>
  //         </div>
  //         <button type="submit" class="btn-save">Simpan</button>
  //       </form>
  //     </div>
  //   `;
  // }
  
  // function saveUserProfile(event) {
  //   event.preventDefault();
  //   let getData = JSON.parse(localStorage.getItem("state"));
  //   const user = users.find((u) => u.id === getData.id_user);
  
  //   user.name = document.getElementById("name").value;
  //   user.email = document.getElementById("email").value;
  //   user.phone = document.getElementById("phone").value;
  //   user.address = document.getElementById("address").value;
  
  //   // Simpan data ke localStorage atau backend
  //   localStorage.setItem("users", JSON.stringify(users));
  //   alert("Profil berhasil diperbarui!");
  //   renderUserProfile();
  // }
  
  
  function renderAbout() {
    const app = document.getElementById("app");
    updateStateProperty("adminLoggedIn", false);
    app.innerHTML = `
          <div class="card">
              <h2>Tentang Kami</h2>
              <p>RS Booking System adalah platform inovatif yang menghubungkan pasien dengan layanan kesehatan terbaik. Kami berkomitmen untuk menyediakan akses mudah ke perawatan kesehatan berkualitas tinggi.</p>
              <h3 style="margin: 10px 0;">Misi Kami</h3>
              <ul style="margin-left: 22px;">
                  <li>Menyederhanakan proses pemesanan layanan kesehatan</li>
                  <li>Meningkatkan akses ke perawatan kesehatan berkualitas</li>
                  <li>Mengoptimalkan pengalaman pasien dan penyedia layanan kesehatan</li>
              </ul>
          </div>
      `;
  }
  
  function renderContact() {
    const app = document.getElementById("app");
    updateStateProperty("adminLoggedIn", false);
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
  
    document
      .getElementById("contactForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Terima kasih! Pesan Anda telah terkirim.");
        this.reset();
      });
  }
  
  function renderHospitalSelection() {
    const app = document.getElementById("app");
    renderNavbar();
    app.innerHTML = `
          <div class="card">
              <h2>Pilih Rumah Sakit</h2>
              <select id="hospitalSelect">
                  <option value="">Pilih Rumah Sakit</option>
                  ${hospitals
        .map(
          (hospital) =>
            `<option value="${hospital.id}">${hospital.name}</option>`
        )
        .join("")}
              </select>
              <button id="nextBtn" disabled>Lanjutkan</button>
          </div>
      `;
  
    const hospitalSelect = document.getElementById("hospitalSelect");
    const nextBtn = document.getElementById("nextBtn");
  
    hospitalSelect.addEventListener("change", (e) => {
      updateStateProperty("selectedHospital", e.target.value);
      // Ambil ulang data terbaru dari localStorage
      let updatedData = JSON.parse(localStorage.getItem("state"));
      nextBtn.disabled = !updatedData.selectedHospital;
    });
  
    nextBtn.addEventListener("click", () => {
      let updatedData = JSON.parse(localStorage.getItem("state"));
      if (!updatedData.selectedHospital) return;
      updateStateProperty("step", 4);
  
      renderApp();
    });
  }
  
  function renderDoctorSearch() {
    const app = document.getElementById("app");
    renderNavbar();
    let getData = JSON.parse(localStorage.getItem("state"));
    const selectedHospital = hospitals.find(
      (h) => h.id == getData.selectedHospital
    );
    app.innerHTML = `
          <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Layanan di ${selectedHospital.name}</h2>
                <div>
                  <button id="backBtn" class="back-btn">Kembali</button>
                </div>
              </div>
              <div class="search-container">
                  <div class="search-wrapper">
                      <input type="text" placeholder="Cari nama dokter Anda disini" id="doctorSearch">
                      <select id="specialtySelect">
                          ${specialties
        .map(
          (specialty) =>
            `<option value="${specialty}">${specialty}</option>`
        )
        .join("")}
                      </select>
                      <select id="subspecialtySelect">
                          ${subspecialties
        .map(
          (subspecialty) =>
            `<option value="${subspecialty}">${subspecialty}</option>`
        )
        .join("")}
                      </select>
                      <button id="searchBtn" class="search-btn">CARI</button>
                  </div>
              </div>
              <div class="content-container">
                  <h3>Cari Jadwal Dokter Telekonsultasi di ${selectedHospital.name
      }</h3>
                  <p class="subtitle">Untuk mencari dokter anda dapat memilih nama dokter atau mencari berdasarkan spesialis dan atau subspesialis</p>
                  <div id="doctorsList" class="doctors-list">
                      ${renderDoctorCards()}
                  </div>
              </div>
          </div>
      `;
  
    setupSearchHandlers();
    document.getElementById("backBtn").addEventListener("click", () => {
      updateStateProperty("step", 1);
      renderApp();
    });
  }
  
  function renderDoctorCards(filters = {}) {
    let getData = JSON.parse(localStorage.getItem("state"));
    const filteredDoctors = doctors.filter((doctor) => {
      if (doctor.hospitalId != getData.selectedHospital) {
        return false;
      }
      if (filters.search) {
        if (!doctor.name.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
      }
      if (filters.specialty && filters.specialty !== "Semua Spesialis") {
        if (doctor.speciality !== filters.specialty) {
          return false;
        }
      }
      if (filters.subspecialty && filters.subspecialty !== "Semua Subspesialis") {
        if (doctor.subSpeciality !== filters.subspecialty) {
          return false;
        }
      }
      return true;
    });
  
    return filteredDoctors
      .map(
        (doctor) => `
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
      `
      )
      .join("");
  }
  
  function setupSearchHandlers() {
    const searchInput = document.getElementById("doctorSearch");
    const specialtySelect = document.getElementById("specialtySelect");
    const subspecialtySelect = document.getElementById("subspecialtySelect");
    const searchBtn = document.getElementById("searchBtn");
    const doctorsList = document.getElementById("doctorsList");
  
    const performSearch = () => {
      const filters = {
        search: searchInput.value,
        specialty: specialtySelect.value,
        subspecialty: subspecialtySelect.value,
      };
      doctorsList.innerHTML = renderDoctorCards(filters);
    };
  
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
  
  function selectDoctor(doctorId) {
    let updatedData = JSON.parse(localStorage.getItem("state"));
    if (!updatedData.selectedHospital) return;
    if (!updatedData.isLoggedIn) {
      updateStateProperty("step", 2);
    } else {
      updateStateProperty("step", 3);
    }
    updateStateProperty("selectedDoctor", doctorId);
    renderApp();
  }
  
  function startChat(doctorId) {
    // Implement chat functionality
    console.log("Starting chat with doctor:", doctorId);
  }
  
  function renderCalendarAndDoctors() {
    const app = document.getElementById("app");
    renderNavbar();
    let getData = JSON.parse(localStorage.getItem("state"));
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const selectedDoctor = doctors.find((d) => d.id == getData.selectedDoctor);
    const selectedHospital = hospitals.find(
      (h) => h.id == getData.selectedHospital
    );
  
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
  
    const bookBtn = document.getElementById("bookBtn");
    const backBtn = document.getElementById("backBtn");
  
    bookBtn.addEventListener("click", () => {
      let updatedData = JSON.parse(localStorage.getItem("state"));
      if (
        !updatedData.selectedDate ||
        !isDateAvailable(selectedDoctor.schedule, updatedData.selectedDate)
      ) {
        alert("Jadwal dokter tidak tersedia pada tanggal yang dipilih.");
        return;
      }
      updateStateProperty("step", 5);
      renderApp();
    });
  
    backBtn.addEventListener("click", () => {
      updateStateProperty("step", 4);
      renderApp();
    });
  }
  
  function renderCalendar(year, month) {
    const calendar = document.getElementById("calendar");
    const date = new Date(year, month, 1);
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const today = new Date();
  
    let calendarHTML = `
          <div class="calendar-header">
              <div>
                <button id="prevMonth">&lt;</button>
              </div>
              <h3>${date.toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
    })}</h3>
              <div>
                <button id="nextMonth">&gt;</button>
              </div>
          </div>
      `;
  
    days.forEach((day) => {
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
              <div class="calendar-day ${isToday ? "today" : ""} ${isPast ? "past" : ""
        }" 
                   data-date="${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(i).padStart(2, "0")}"
                   ${isPast ? "disabled" : ""}>
                  ${i}
              </div>`;
    }
  
    calendar.innerHTML = calendarHTML;
  
    const calendarDays = document.querySelectorAll(
      ".calendar-day[data-date]:not(.past)"
    );
    calendarDays.forEach((day) => {
      day.addEventListener("click", () => {
        calendarDays.forEach((d) => d.classList.remove("selected"));
        day.classList.add("selected");
        updateStateProperty("selectedDate", day.dataset.date);
        let updatedData = JSON.parse(localStorage.getItem("state"));
        document.getElementById("bookBtn").disabled = !updatedData.selectedDate;
      });
    });
  
    document.getElementById("prevMonth").addEventListener("click", () => {
      const newDate = new Date(year, month - 1, 1);
      renderCalendar(newDate.getFullYear(), newDate.getMonth());
    });
  
    document.getElementById("nextMonth").addEventListener("click", () => {
      const newDate = new Date(year, month + 1, 1);
      renderCalendar(newDate.getFullYear(), newDate.getMonth());
    });
  }
  
  function renderAuthPage() {
    const app = document.getElementById("app");
    let getData = JSON.parse(localStorage.getItem("state")) || {};
  
    // Pastikan authMode ada di state, default ke "signIn"
    if (!getData.authMode) {
      getData.authMode = "signIn";
      localStorage.setItem("state", JSON.stringify(getData));
    }
  
    const isSignIn = getData.authMode === "signIn";
  
    app.innerHTML = `
          <div class="card">
              <h2>${isSignIn ? "Sign In" : "Sign Up"}</h2>
              <input type="text" id="email" placeholder="Username/Email" required>
              <input type="password" id="password" placeholder="Password" required>
              ${!isSignIn
        ? '<input type="password" id="confirmPassword" placeholder="Confirm Password" required>'
        : ""
      }
              <button id="authBtn" disabled>${isSignIn ? "Sign In" : "Sign Up"
      }</button>
              <p>
                  ${isSignIn
        ? "Don't have an account? "
        : "Already have an account? "
      }
                  <a href="#" id="toggleAuth">${isSignIn ? "Sign Up" : "Sign In"
      }</a>
              </p>
          </div>
      `;
  
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const authBtn = document.getElementById("authBtn");
  
    const validateAuthFields = () => {
      const isValid =
        emailInput.value &&
        passwordInput.value &&
        (isSignIn || confirmPasswordInput?.value === passwordInput.value);
      authBtn.disabled = !isValid;
    };
  
    emailInput.addEventListener("input", validateAuthFields);
    passwordInput.addEventListener("input", validateAuthFields);
    if (!isSignIn) {
      confirmPasswordInput.addEventListener("input", validateAuthFields);
    }
  
    authBtn.addEventListener("click", () => {
      const username = emailInput.value;
      const password = passwordInput.value;
  
      if (isSignIn) {
        // Login sebagai admin
        const admin = admins.find(
          (a) => a.username === username && a.password === password
        );
  
        if (admin) {
          updateStateProperty("adminLoggedIn", true);
          updateStateProperty("currentAdmin", admin.hospitalId);
          updateStateProperty("id_admin", admin.id);
          updateStateProperty("adminView", "dashboard");
          renderApp();
          return;
        }
  
        // Login sebagai user
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const get = JSON.parse(localStorage.getItem("state"));
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
  
        if (get.selectedHospital == null) {
          user.isLoggedIn = true;
          localStorage.setItem("users", JSON.stringify(users));
          updateStateProperty("isLoggedIn", true);
          updateStateProperty("step", 1); 
          renderApp();
        } else if (user) {
          user.isLoggedIn = true;
          localStorage.setItem("users", JSON.stringify(users)); // Simpan ke localStorage
          updateStateProperty("isLoggedIn", true);
          updateStateProperty("step", 3); 
          renderApp();
        } else {
          alert("Invalid username or password");
        }
      } else {
        // Sign up sebagai user baru
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((u) => u.username === username)) {
          alert("Username already exists. Please choose another.");
          return;
        }
  
        const newUser = { username, password, isLoggedIn: true };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        updateStateProperty("authMode", "signIn");
        updateStateProperty("username", username);
        updateStateProperty("isLoggedIn", true);
        updateStateProperty("step", 3); 
        renderApp();
      }
    });
  
    document.getElementById("toggleAuth").addEventListener("click", (e) => {
      e.preventDefault();
      updateStateProperty("authMode", isSignIn ? "signUp" : "signIn");
      renderAuthPage();
    });
  }
  
  // Fungsi untuk memperbarui properti pada state dan menyimpan ke localStorage
  function updateStateProperty(property, value) {
    let state = JSON.parse(localStorage.getItem("state"));
    state[property] = value;
    localStorage.setItem("state", JSON.stringify(state));
  }
  
  function updateUserProperty(property, value) {
    let users = JSON.parse(localStorage.getItem("users"));
    users[property] = value;
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  function renderBookingForm() {
    const app = document.getElementById("app");
    renderNavbar();
    let getData = JSON.parse(localStorage.getItem("state"));
    const selectedDoctor = doctors.find((d) => d.id == getData.selectedDoctor);
    const selectedHospital = hospitals.find(
      (h) => h.id == getData.selectedHospital
    );
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
                  <p>Tanggal: ${getData.selectedDate}</p>
              </div>
              <button id="confirmBtn" disabled>Konfirmasi Booking</button>
              <button id="backBtn" class="back-btn">Kembali</button>
          </div>
      `;
  
    const patientNameInput = document.getElementById("patientName");
    const patientNIKInput = document.getElementById("patientNIK");
    const confirmBtn = document.getElementById("confirmBtn");
    const backBtn = document.getElementById("backBtn");
  
    const validateBookingFields = () => {
      confirmBtn.disabled = !patientNameInput.value || !patientNIKInput.value;
    };
  
    patientNameInput.addEventListener("input", validateBookingFields);
    patientNIKInput.addEventListener("input", validateBookingFields);
  
    const insuranceType = document.getElementById("insuranceType");
    const bpjsField = document.getElementById("bpjsField");
  
    insuranceType.addEventListener("change", (e) => {
      updateStateProperty("insuranceType", e.target.value);
      let updatedData = JSON.parse(localStorage.getItem("state"));
      bpjsField.style.display =
        updatedData.insuranceType === "bpjs" ? "block" : "none";
    });
  
    confirmBtn.addEventListener("click", () => {
      updateStateProperty("patientName", patientNameInput.value);
      updateStateProperty("patientNIK", patientNIKInput.value);
      let bpjs = document.getElementById("bpjsNumber").value;
      updateStateProperty("bpjsNumber", bpjs);
      state.step = 6;
      updateStateProperty("step", 6);
      renderApp();
    });
  
    backBtn.addEventListener("click", () => {
      updateStateProperty("step", 3);
      renderApp();
    });
  }
  
  function renderConfirmation() {
    const app = document.getElementById("app");
    renderNavbar();
    let getData = JSON.parse(localStorage.getItem("state"));
    const selectedDoctor = doctors.find((d) => d.id == getData.selectedDoctor);
    const selectedHospital = hospitals.find(
      (h) => h.id == getData.selectedHospital
    );
    const uniqueCode = generateUniqueCode(selectedDoctor.speciality);
  
    app.innerHTML = `
          <div class="card">
              <h2>Booking Confirmed</h2>
              <p>Terima kasih, ${getData.patientName}!</p>
              <p>Booking Anda telah dikonfirmasi untuk:</p>
              <p>Rumah Sakit: ${selectedHospital.name}</p>
              <p>Poli: ${selectedDoctor.speciality}</p>
              <p>Dokter: ${selectedDoctor.name}</p>
              <p>Tanggal: ${getData.selectedDate}</p>
              <p>Jenis Layanan: ${getData.insuranceType === "bpjs" ? "BPJS" : "Umum"
      }</p>
              ${getData.insuranceType === "bpjs"
        ? `<p>Nomor BPJS: ${getData.bpjsNumber}</p>`
        : ""
      }
              <p>Kode Unik: <strong>${uniqueCode}</strong></p>
              <button id="newBookingBtn">Buat Booking Baru</button>
          </div>
      `;
  
    document.getElementById("newBookingBtn").addEventListener("click", () => {
      saveCurrentState();
  
      const state = {
        step: 1,
        selectedHospital: null,
        selectedDate: null,
        selectedDoctor: null,
        isLoggedIn: true,
        patientName: "",
        patientNIK: "",
        insuranceType: "umum",
        bpjsNumber: "",
        currentAdmin: null,
        adminLoggedIn: false,
        currentView: "home",
        adminView: "login",
      };
  
      localStorage.setItem("state", JSON.stringify(state));
  
      renderApp();
    });
  }
  
  // Fungsi untuk menyimpan state saat ini sebelum di-reset
  function saveCurrentState() {
    const currentState = JSON.parse(localStorage.getItem("state"));
    const historyKey = "bookingHistory"; // Key untuk riwayat data di localStorage
    const bookingHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Cari user yang sedang login
    const loggedInUser = users.find((user) => user.isLoggedIn);
  
    if (loggedInUser) {
      // Tambahkan username ke data saat ini
      let user = currentState.username = loggedInUser.username;
      localStorage.setItem('state', user);
  
    }
  
    // Tambahkan data saat ini ke riwayat
    bookingHistory.push(currentState);
  
    // Simpan riwayat kembali ke localStorage
    localStorage.setItem(historyKey, JSON.stringify(bookingHistory));
  }
  
  
  function cancelAdminLogin() {
    updateStateProperty("adminView", "login");
    updateStateProperty("currentView", "home");
    updateStateProperty("adminLoggedIn", false);
    renderApp();
  }
  
  function logout() {
    updateStateProperty("currentAdmin", null);
    updateStateProperty("adminView", "login");
    updateStateProperty("currentView", "home");
    updateStateProperty("adminLoggedIn", false);
    renderNavbarAdmin();
    renderApp();
  }
  
  function logoutUser() {
    const state = {
      step: 1,
      selectedHospital: null,
      selectedDate: null,
      selectedDoctor: null,
      isLoggedIn: false,
      patientName: "",
      patientNIK: "",
      insuranceType: "umum",
      bpjsNumber: "",
      currentAdmin: null,
      adminLoggedIn: false,
      currentView: "home",
      adminView: "login",
    };
    localStorage.setItem("state", JSON.stringify(state));
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Update status login user yang sedang login
    const updatedUsers = users.map((user) => ({
      ...user,
      isLoggedIn: false, // Set semua user ke logged out
    }));
  
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Simpan kembali ke localStorage
    renderNavbar(); // Perbarui navbar
    // renderAuthPage(); // Kembali ke halaman login
    renderApp();
  }
  
  // New function to check if the selected date is available
  function isDateAvailable(schedule, selectedDate) {
    const date = new Date(selectedDate);
    const day = date.toLocaleString("id-ID", { weekday: "long" }).toLowerCase(); // Get the day in Indonesian
  
    // Check if the schedule for the selected day is available
    return schedule[day] !== "-";
  }
  
  function renderAdminHome() {
    const adminContent = document.getElementById("adminContent");
    let getData = JSON.parse(localStorage.getItem("state"));
    const hospital = hospitals.find((h) => h.id === getData.currentAdmin);
    adminContent.innerHTML = `
           <div class="admin-home-container">
            <h3>Beranda Admin</h3>
            <span>Rumah Sakit: ${hospital.name}</span>
            <p>Selamat datang di panel admin. Silakan pilih menu di atas untuk mengelola sistem.</p>
          </div>
      `;
  }
  
  function renderAdminAbout() {
    const adminContent = document.getElementById("adminContent");
    adminContent.innerHTML = `
          <h3>Tentang Kami</h3>
          <p>RS Booking System adalah platform inovatif yang menghubungkan pasien dengan layanan kesehatan terbaik. Kami berkomitmen untuk menyediakan akses mudah ke perawatan kesehatan berkualitas tinggi.</p>
          <h4>Misi Kami</h4>
          <ul>
              <li>Menyederhanakan proses pemesanan layanan kesehatan</li>
              <li>Meningkatkan akses ke perawatan kesehatan berkualitas</li>
              <li>Mengoptimalkan pengalaman pasien dan penyedia layanan kesehatan</li>
          </ul>
      `;
  }
  
  function renderAdminContact() {
    const adminContent = document.getElementById("adminContent");
    adminContent.innerHTML = `
          <h3>Hubungi Kami</h3>
          <p>Untuk informasi lebih lanjut atau bantuan, silakan hubungi:</p>
          <p><strong>Email:</strong> admin@rsbooking.com</p>
          <p><strong>Telepon:</strong> (021) 123-4567</p>
          <p><strong>Alamat:</strong> Jl. Kesehatan No. 1, Jakarta Pusat</p>
      `;
  }
  
  // Initialize the app
  renderApp();