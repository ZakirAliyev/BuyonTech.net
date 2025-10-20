import { useNavigate } from 'react-router';
import './index.scss'
import image404 from "/src/assets/404.svg"

function NotFoundPage() {
    const navigate = useNavigate();
    const handleClickLink = (navigator) => {
        navigate(navigator)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <section id="notFoundPage">
            <img src={image404} alt={"Image"} className={"image404"} />
            <div className={"title"}>Oops... Page Not Found.</div>
            <div className={"description"}>But don’t worry — you’re just one click away from home.</div>
            <button
                onClick={() => {
                    handleClickLink('/')
                }}>Back to Home</button>
        </section>
    );
}

export default NotFoundPage;