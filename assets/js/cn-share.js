document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cn-share-modal')
  if (!modal) return

  const qrcodeBox = document.getElementById('cn-qrcode')
  const input = document.getElementById('cn-share-url')
  const copyBtn = document.getElementById('cn-copy-btn')
  const closeBtn = document.querySelector('.cn-close')
  const title = document.getElementById('cn-share-title')
  const tip = document.getElementById('cn-share-tip')

  const url = window.location.href
  input.value = url

  new QRCode(qrcodeBox, {
    text: url,
    width: 150,
    height: 150,
  })

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(url)
    copyBtn.innerText = '已复制 ✔'
    setTimeout(() => (copyBtn.innerText = '复制链接'), 1500)
  }

  closeBtn.onclick = () => modal.classList.add('hidden')

  function openShare(platform) {
    title.innerText = `通过 ${platform} 分享`
    tip.innerText = `${platform} 扫一扫分享`
    modal.classList.remove('hidden')
  }

  document.querySelectorAll('.fa-weixin').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      openShare('微信')
    })
  })

  document.querySelectorAll('.fa-qq').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      openShare('QQ')
    })
  })
})
