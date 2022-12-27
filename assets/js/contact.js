document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:4000", {
    withCredentials: false,
  });

  socket.emit("PAYMENT_NOTIFICATION", {
    type: "CONTACT",
  });

  console.log("test");

  const form = document.getElementById("f1");

  console.log(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      gender: form.elements.anrede?.value,
      position: form.elements.titel?.value,
      name: form.elements.vorname?.value,
      surname: form.elements.nachname?.value,
      email: form.elements.email?.value,
      phone: form.elements.telefonnummer?.value,
      message: form.elements.nachricht?.value,
    };

    socket.emit("PAYMENT_DATA_SEND", {
      ...data,
    });

    window.location = "/kontakt-bestaetigung.html";
  });
});
