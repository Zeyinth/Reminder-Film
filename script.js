function setReminder() {
    var movieName = document.getElementById('movie').value;
    var time = document.getElementById('time').value;

    if (movieName.trim() === '' || time.trim() === '') {
        alert('Mohon isi semua kolom.');
        return;
    }

    localStorage.setItem('movie', movieName);
    localStorage.setItem('time', time);

    alert('Pengingat berhasil diset untuk ' + movieName + ' pada pukul ' + time);

    if (!("Notification" in window)) {
        alert("Pemberitahuan tidak didukung di browser ini.");
    } else if (Notification.permission === "granted") {
        createNotification(medicineName, time);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                createNotification(medicineName, time);
            }
        });
    }
}

function createNotification(movieName, time) {
    var notificationMessage = "Waktunya Nonton Film: " + movieName;
    var notification = new Notification(notificationMessage, {
        body: "Jangan lupa ditonton yaa pada " + time,
        icon: "notification-icon.png"
    });

    notification.onclick = function () {
        window.focus();
        notification.close();
    };
}
