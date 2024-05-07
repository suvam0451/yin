import {FaGithub, FaDiscord, FaWrench, FaBook} from "react-icons/fa";
import {FaHeart, FaBookmark} from "react-icons/fa6";


const MARGIN = "0.75rem"
const FONT_COLOR = "#ffffff99"

function CommonBanner() {
  return <>
    <div style={{
      flexDirection: "row",
      fontSize: "1.0rem"
    }}>
      <div style={{display: "inline-flex", alignItems: "center", marginRight: MARGIN}}>
        <FaWrench color={FONT_COLOR}/>
        <a style={{color: FONT_COLOR, marginLeft: "4px"}}>Dashboard</a>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center",
        marginLeft: MARGIN,
        marginRight: MARGIN
      }}>
        <FaBook color={FONT_COLOR}/>
        <a style={{color: FONT_COLOR, marginLeft: "4px"}}>Docs</a>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center",
        marginLeft: MARGIN,
        marginRight: MARGIN
      }}>
        <FaGithub color={FONT_COLOR}/>
        <a style={{color: FONT_COLOR, marginLeft: "4px"}}>Github</a>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center",
        marginLeft: MARGIN,
        marginRight: MARGIN
      }}>
        <FaDiscord color={FONT_COLOR}/>
        <a style={{color: FONT_COLOR, marginLeft: "4px"}}>Discord</a>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center",
        marginLeft: MARGIN,
      }}>
        <FaHeart color={FONT_COLOR}/>
        <a style={{color: FONT_COLOR, marginLeft: "4px"}}>Support</a>
      </div>
    </div>
  </>
}

export default CommonBanner;