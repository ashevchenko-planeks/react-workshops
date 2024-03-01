import {useMediaQuery} from "usehooks-ts";
import MobilePresentation from "./MobilePresentation.tsx";
import DesktopPresentation from "./DesktopPresentation.tsx";

const Presentation = () => {
    const isMobile = useMediaQuery('(max-width: 1000px)')

    if(isMobile) {
        return <MobilePresentation />
    }

    return (
        <DesktopPresentation />
    )
}

export default Presentation
