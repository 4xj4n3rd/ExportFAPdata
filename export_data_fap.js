function removeAccents(str) {
    const accents = ['á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'đ', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'í', 'ì', 'ỉ', 'ĩ', 'ị', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'];
    const noAccents = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'd', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'y', 'y', 'y', 'y', 'y'];
    let newStr = str;
    for (let i = 0; i < accents.length; i++) {
        newStr = newStr.replace(new RegExp(accents[i], 'g'), noAccents[i]);
    }
    return newStr;
}

function extractTableData() {
    const table = document.getElementById('id');
    if (!table) return [];

    const rows = table.querySelectorAll('tbody tr');
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if(cells.length < 6) return;

        const givenName = cells[5]?.textContent?.trim() || "";
        const surname = cells[3]?.textContent?.trim() || "";
        const middleName = cells[4]?.textContent?.trim() || "";
        const member = cells[2]?.textContent?.trim().toLowerCase() || "";

        const surnameFirstLetter = surname.charAt(0).toLowerCase();
        const middleNameFirstLetters = middleName.split(' ').map(name => name.charAt(0).toLowerCase()).join('');
        const email = `${removeAccents(givenName).toLowerCase()}${removeAccents(surnameFirstLetter)}${removeAccents(middleNameFirstLetters)}${member}@fpt.edu.vn`;

        const rowData = [
            cells[0]?.textContent?.trim() || "",
            cells[2]?.textContent?.trim() || "",
            surname,
            middleName,
            givenName,
            email
        ];
        data.push(rowData.map(cellData => `"${cellData}"`));
    });

    return data;
}

function convertToCSV(data) {
    const header = ["INDEX", "MEMBER", "SURNAME", "MIDDLE NAME", "GIVEN NAME", "Email"];
    data.unshift(header);
    return data.map(row => row.join(',')).join('\n');
}

function downloadCSV(csvData, fileName) {
    const BOM = '\uFEFF'; // Byte Order Mark for UTF-8
    const blob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportData() {
    const data = extractTableData();
    const csvData = convertToCSV(data);
    downloadCSV(csvData, "export.csv");
}

exportData();
