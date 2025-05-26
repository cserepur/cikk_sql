const cikkekData = document.getElementById('cikkekTable');
const cikkArray = [];

document.getElementById('cikkForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const myFormData = new FormData(e.target);
    const cikkData = Object.fromEntries(myFormData);
//Adatok elküldése a webszervernek
    try {
        const response = await fetch('/cikk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cikkData)
        });
//Hibás szerver válasz
        if (!response.ok) throw new Error('Hiba a szerver válaszában');

        const result = await response.json();
        console.log('Szerver válasz:', result);

        cikkArray.push(cikkData);
        cikkekData.innerHTML = cikkArray.map((cikk, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${cikk.cim}</td>
                <td>${cikk.szerzo}</td>
                <td>${cikk.publikacio_datuma}</td>
                <td>${cikk.kategoria}</td>
                <td>${cikk.tartalom}</td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Hiba:', error.message);
    }
});
