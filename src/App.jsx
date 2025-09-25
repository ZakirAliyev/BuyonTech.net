import './styles/main.scss';
import {createBrowserRouter} from "react-router";
import {ROUTES} from "./routes/ROUTES.jsx";
import {RouterProvider} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {PulseLoader} from "react-spinners";
import Lenis from "@studio-freight/lenis";

function App() {
    const routes = createBrowserRouter(ROUTES);
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2,
            easing: (t) => 1 - Math.pow(2, -10 * t),
            smoothWheel: true,
            smoothTouch: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);
    return (<Suspense fallback={<PulseLoader/>}> <RouterProvider router={routes}/> </Suspense>)
}

export default App;