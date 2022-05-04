import * as XLSX from "xlsx";

const ReadXlsx = async (setData, sheetNo) => {

    const dataFilePath = import.meta.env.VITE_DATA_FILE_PATH;
    // console.log(dataFilePath);

    await fetch(dataFilePath)
    .then(resp => resp.blob())
    .then(data => {
      const file = data; //e.target.files;
      const reader = new FileReader();
  
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[sheetNo];
        const ws = wb.Sheets[wsname];
        const jsondata = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const xlData = [];

        const headers = jsondata[0];

        for(let i=1;i<jsondata.length;i++){
          let d = {};
          for(let j=0;j<headers.length;j++){
            d[headers[j]] = jsondata[i][j];
          }
          
          xlData.push(d);
        }
  
        setData(xlData);
      };
      reader.readAsBinaryString(file);
    });
  
    
}

export default ReadXlsx;