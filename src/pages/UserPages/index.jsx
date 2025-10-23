import Lenis from "@studio-freight/lenis/types";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LenisWrapper from "../../components/SwitcherComponents/LenisWrapper";

function MainPage() {
   
    return (
        <>
            <Outlet />
            <LenisWrapper />

        </>
    );
}

export default MainPage;