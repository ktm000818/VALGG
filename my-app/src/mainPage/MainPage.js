import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAutoComplete from '../components/CustomAutoComplete';
import { getAccountData } from '../store/RiotApi';
import { debounce } from '../Utils';
import "./main_page.css";

export default function MainPage() {

    const [userList, setUserList] = useState([{ name: '' }]);
    const navigate = useNavigate();

    const handleChangeAutoComplete = useCallback((value) => {
        if (value) {
            const [name, tag] = value.split("#");
            navigate(`/profile?name=${name}&tag=${tag}`, {
                state: {
                    name,
                    tag
                }
            })
        }
    }, [navigate])

    const handleChangeTextField = useCallback(async (value) => {
        if (value.includes("#")) {
            debounce(async () => {
                const [name, tag] = value.split("#");
                const USER_LIST = await getAccountData(name, tag, true);
                console.log(USER_LIST)
                setUserList([USER_LIST]);
            }, 500)
        } else {
            setUserList([{ name: '' }]);
        }
    }, [userList])

    return (
        <>
            <div className='main'>
                <div className='main_content'>
                    <div className='main_content_logo_image'>
                        <img src={"https://valorant.op.gg/images/valorant.png"} width="240px" />
                    </div>
                    <div className='main_content_autoComplete'>
                        <CustomAutoComplete options={userList} onInputChange={handleChangeTextField} onChange={handleChangeAutoComplete} style={{ width: "500px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}