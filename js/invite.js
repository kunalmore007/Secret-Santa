function shareInvite() {
  const link = window.location.href.replace("index.html", "");
  const msg = encodeURIComponent(
    "🎄 You're invited to our Secret Santa!\n\n" +
    "Join here 👉 " + link + "\n\n🎁 Let the fun begin!"
  );

  window.open(`https://wa.me/?text=${msg}`, "_blank");
}
