import axios from "axios";
import { useEffect, useState } from "react"


function Read() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/profiles')
            .then(response => {
                console.log(response.data.profiles);
                setAPIData(response.data.profiles)
            });
    }, [])



    return (
        <>
            <table>

                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        APIData.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td key={element.id}>{element.id}</td>
                                    <td key={element.name}>{element.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <select name="profile" id="profile">
            {
                        APIData.map(element => {
                            return (
                                <option key={element.id}>{element.name}</option>
                            )
                        })
                    }
            </select>
        </>
    )
}

export default Read