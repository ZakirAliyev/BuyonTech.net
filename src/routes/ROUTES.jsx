import MainPage from "../pages/UserPages/index.jsx";
import HomePage from "../pages/UserPages/HomePage/index.jsx";
import OurWorksPage from "../pages/UserPages/OurWorksPage/index.jsx";
import OurWorksPageDetail from "../pages/UserPages/OurWorksPageDetail/index.jsx";

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
                path: "our-works/:id",
                element: <OurWorksPageDetail />
            }
        ]
    }
];