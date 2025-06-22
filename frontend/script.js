async function generateIdeas() {
  const category = document.getElementById("category").value;
  const resultEl = document.getElementById("result");

  if (!category.trim()) {
    resultEl.textContent = "Kategori tidak boleh kosong!";
    return;
  }

  resultEl.textContent = "Sedang memproses...";

  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category })
    });

    const data = await res.json();
    if (data.result) {
      resultEl.textContent = data.result;
    } else {
      resultEl.textContent = "Tidak ada hasil.";
    }
  } catch (err) {
    console.error(err);
    resultEl.textContent = "Terjadi kesalahan saat menghubungi server.";
  }
}
