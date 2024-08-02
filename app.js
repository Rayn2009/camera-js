// Получаем доступ к элементам на странице
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// Запрашиваем доступ к камере
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream
    video.play()
    // После получения видео, фотографируем через 3 секунды
    setTimeout(capturePhoto, 3000)
  })
  .catch((err) => {
    console.error('Ошибка доступа к камере: ', err)
  })

// Функция для захвата фото
function capturePhoto() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL('image/png')
  console.log(dataURL) // Выводим изображение в консоль (или можно отправить его на сервер)
  // Останавливаем видео стрим
  video.srcObject.getTracks().forEach((track) => track.stop())
}
