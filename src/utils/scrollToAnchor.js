/**
 * Created by out_xu on 17/10/29.
 */
const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName)
    if (anchorElement) { anchorElement.scrollIntoView() }
  }
}

export default scrollToAnchor
