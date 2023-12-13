const authToken = sessionStorage.getItem("authToken");

const statusDropdown = document.getElementById('statusDropdown2')
const tableBody = document.querySelector('tbody');
const loadingIndicator = document.getElementById('loading-indicator');

loadingIndicator.style.display = 'block';

const redirectToCounselingDetail = (counselingId) => {
  fetch(
    `https://mentalwell-backend.vercel.app/dashboard/counseling/${counselingId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Failed to fetch");
        throw new Error("Failed to fetch");
      }
    })
    .then((counselingDetails) => {
      // window.location.href = `http://localhost:5501/src/templates/aturkonseling.html?id=${counselingDetails[0].id}`
      window.location.href = `http://mentalwell.vercel.app/aturkonseling?id=${counselingDetails[0].id}`;
    })
    .catch((error) => {
      console.error("Error fetching details:", error);
    });
};

statusDropdown.addEventListener("change", () => {
  const selectedValue = statusDropdown.value;

  Swal.fire({
    title: 'Memuat...',
    text: 'Harap tunggu sejenak. Status ketersediaan anda akan segera berubah ',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  fetch("https://mentalwell-backend.vercel.app/counselings/psychologist", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newAvailability: selectedValue }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update availability");
      }
      return response.json();
    })
    .then((data) => {
      if (selectedValue == "unavailable") {
        formattedValue = "Tidak Tersedia";
      } else {
        formattedValue = "Tersedia";
      }

      Swal.close();

      Swal.fire({
        title: `Berhasil Mengubah Ketersediaan Menjadi ${formattedValue}!`,
        icon: "success",
        timer: 3000,
        showConfirmButton: false, // Hide the "OK" button
      });

    })
    .catch((error) => {
      console.error("Error update availability:", error);
    });
});

tableBody.addEventListener("click", (event) => {
  const isIcon = event.target.tagName === "IMG" && event.target.alt === "tulis";

  const counselingId = event.target
    .closest("tr")
    .querySelector("img")
    .getAttribute("data-counseling-id");

  if (counselingId) {
    redirectToCounselingDetail(counselingId);
  }
});

try {
  fetch("https://mentalwell-backend.vercel.app/dashboard/psychologist", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Failed to fetch");
        throw new Error("Failed to fetch data from the backend.");
      }
    })
    .then(data => {
      loadingIndicator.style.display = 'none';

      if (data.psychologistAvailability == 'unavailable') {
        statusDropdown.value = 'unavailable';
      } else if (data.psychologistAvailability == 'available') {
        statusDropdown.value = 'available';
      }

      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = "";

      data.counselingList.forEach((counseling) => {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell(0);
        const dateCell = row.insertCell(1);
        const timeCell = row.insertCell(2);
        const typeCell = row.insertCell(3);
        const statusCell = row.insertCell(4);
        const actionCell = row.insertCell(5);

        const backendValues = {
          call: "Call",
          video_call: "Video Call",
          chat: "Chat",
          belum_selesai: "Belum Selesai",
          selesai: "Selesai",
        };

        const backendType = counseling.type;
        const backendStatus = counseling.status;
        const displayTextType = backendValues[backendType];
        const displayTextStatus = backendValues[backendStatus];

        nameCell.textContent = counseling.patientName;
        dateCell.textContent = formatDate(counseling.scheduleDate);
        timeCell.textContent = counseling.scheduleTime;
        typeCell.textContent = displayTextType;
        statusCell.textContent = displayTextStatus;

        const actionImage = document.createElement("img");
        actionImage.src = "/src/public/dashboard/tulis.png";
        actionImage.alt = "tulis";
        actionImage.setAttribute("data-counseling-id", `${counseling.id}`);
        actionCell.appendChild(actionImage);
      });
    })
    .catch(error => {
      console.error('Error during data fetching:', error);
      loadingIndicator.style.display = 'none';
    });
} catch (error) {
  console.error('Error during data fetching:', error);
  loadingIndicator.style.display = 'none';
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}
