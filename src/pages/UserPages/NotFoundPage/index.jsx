import './index.scss'
import image404 from "/src/assets/404.svg"

function NotFoundPage() {
    return (
        <section id="notFoundPage">
            <img src={image404} alt={"Image"} className={"image404"}/>
            <div className={"title"}>Oops... Page Not Found.</div>
            <div className={"description"}>But don’t worry — you’re just one click away from home.</div>
            <button>Back to Home</button>
        </section>
    );
}

export default NotFoundPage;