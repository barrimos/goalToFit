const minToHour = (value) => {
    let hr = Math.floor(value / 60);
    let min = value % 60;
    let hour = hr > 1 ? 'hrs' : 'hr';
    if(hr === 0){
        if(min === 0){
            return;
        } else {
            return (`${String(min)} min`);
        }
    } else {
        return (`${String(hr)} : ${String(min).padStart(2,0)} ${hour}`);
    }
}

module.exports = { minToHour };