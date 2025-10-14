import MainPage from "../pages/UserPages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import OurWorksPage from "../pages/UserPages/OurWorksPage/index.jsx";
import OurWorksPageDetail from "../pages/UserPages/OurWorksPageDetail/index.jsx";
import CaseStudyHeaderMarketing from "../components/UserComponents/CaseStudyHeaderMarketing/index.jsx";
import ContactPage from "../pages/UserPages/ContactPage/index.jsx";
import NotFoundPage from "../pages/UserPages/NotFoundPage/index.jsx";
import AboutPage from "../pages/UserPages/AboutPage/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <MainPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'our-works',
                element: <OurWorksPage />,
            },
            {
                path: 'our-works/:id',
                element: <OurWorksPageDetail />,
            },
            {
                path: 'zakir',
                element: <CaseStudyHeaderMarketing />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
        ]
    }
];