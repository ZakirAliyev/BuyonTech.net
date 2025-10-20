import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const PrivateAdminRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const checkAuthorization = async () => {
        try {
            const token = Cookies.get('adminToken') || sessionStorage.getItem('adminToken');
            if (!token) {
                navigate('/*')
            } else {
                // İstəyə görə burda backend ilə token validation əlavə edə bilərsiniz
                // const res = await fetch('/api/admin/validate', { headers: { Authorization: `Bearer ${token}` } })
                // if (!res.ok) navigate('/');
            }
        } catch (err) {
            toast.error("Something went wrong");
            navigate('/');
        } finally {

            setTimeout(() => setLoading(false), 1500);
        }
    };
    useEffect(() => {

        checkAuthorization();
    }, [navigate]);

    if (loading) {
        return (
            <div className="bg-load myLoad">
                <div className="load">
                    <span className='load1'></span>
                    <span className='load2'></span>
                    <span className='load3'></span>
                    <span className='load4'></span>
                </div>
            </div>
        );
    }

    return <Element {...rest} />;
};

export default PrivateAdminRoute;