import Nav from "../nav/nav";
import { useDailyReport } from "../../hooks/useDailyReport";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSimpleReport } from "../../redux/report/reportSlice";

export default function Traffic () {
    useDailyReport();
    const report = useTypedSelector(selectSimpleReport);
    
    return (
        <>
            <Nav/>
            <section>Traffic</section>
        </>
    )
}