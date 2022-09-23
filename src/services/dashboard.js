import axios from 'axios';

const BASE_URL = 'http://localhost:44386';


export default class Dashboard {

    async createData(data, lastUrl) {
        console.log('Data a enviar:', data);
        console.log('Url a enviar:', `${BASE_URL}/${lastUrl}`);
        axios
            .post(
                `${BASE_URL}/${lastUrl}`,
                 data ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => response.data);
    }
}
