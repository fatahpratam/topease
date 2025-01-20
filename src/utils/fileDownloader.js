export async function fileDownloader(fileName, fileUrl) {
  const
    res = await fetch(fileUrl),
    data = await res.blob(),
    objUrl = window.URL.createObjectURL(data),
    link = document.createElement('a');

  link.href = objUrl;
  link.download = fileName;
  link.click();
  link.remove();
}