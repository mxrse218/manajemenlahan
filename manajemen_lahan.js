function cekKondisiCuaca(weatherData) {
    const suhuCocok = weatherData.temperature >= 20 && weatherData.temperature <= 30;
    const kelembapanCocok = weatherData.humidity > 50;
    const anginCocok = weatherData.windSpeed < 15;
    
    return suhuCocok && kelembapanCocok && anginCocok;
}

function kelolaLahan(lahan, weatherData) {
    console.log("=== PROGRAM MANAJEMEN LAHAN PERKEBUNAN ===\n");
    
//kondisi awal lahan
    console.log("Kondisi awal lahan:");
    lahan.forEach((baris, index) => {
        console.log(`Baris ${index + 1}: [${baris.join(", ")}]`);
    });
    console.log("");
//data cuaca    
    console.log("Data cuaca saat ini:");
    console.log(`- Suhu: ${weatherData.temperature}°C`);
    console.log(`- Kelembapan: ${weatherData.humidity}%`);
    console.log(`- Kecepatan Angin: ${weatherData.windSpeed} km/h\n`);
    
//kondisi cuaca
    const cuacaCocok = cekKondisiCuaca(weatherData);
    
    if (!cuacaCocok) {
        console.log(" !!!  Peringatan: Cuaca tidak cocok untuk bercocok tanam");
    } else {
        console.log("**Cuaca cocok untuk bercocok tanam**");
    }
    

    let totalPetakSubur = 0;
    let totalPetakDitanami = 0;
    
    for (let i = 0; i < lahan.length; i++) {
        const baris = lahan[i];
        const totalPetak = baris.length;
        let jumlahSubur = 0;
        
        for (let j = 0; j < baris.length; j++) {
            if (baris[j] === "subur") {
                jumlahSubur++;
            }
        }
        
        const persentaseSubur = (jumlahSubur / totalPetak) * 100;
        
        if (persentaseSubur < 50) {
            //petak di baris menjadi kering
            console.log(`X Baris ${i + 1}: Hanya ${persentaseSubur.toFixed(1)}% petak subur (di bawah 50%) -> seluruh baris diubah menjadi kering`);
            for (let j = 0; j < baris.length; j++) {
                lahan[i][j] = "kering";
            }
        } else {
            console.log(`** Baris ${i + 1}: ${persentaseSubur.toFixed(1)}% petak subur (memenuhi syarat)`);
            totalPetakSubur += jumlahSubur;
            
            //cuaca cocok=petak subur akan ditanami
            if (cuacaCocok) {
                totalPetakDitanami += jumlahSubur;
            }
        }
    }
    
    //output akhir
    console.log("\n=== HASIL AKHIR ===");
    console.log(`Total petak subur: ${totalPetakSubur}`);
    console.log(`Total petak yang ditanami: ${totalPetakDitanami}`);
    
    if (!cuacaCocok && totalPetakDitanami === 0) {
        console.log("X Tidak ada petak yang ditanami karena cuaca tidak mendukung");
    }
    
    return {
        totalPetakSubur,
        totalPetakDitanami,
        cuacaCocok
    };
}

//contoh penggunaan
const lahan1 = [
    ["subur", "kering", "subur", "subur"],
    ["tandus", "kering", "kering", "subur"],
    ["subur", "subur", "subur", "kering"],
    ["kering", "kering", "kering", "kering"]
];

const weatherData1 = {
    temperature: 28,
    humidity: 55,
    windSpeed: 12
};

kelolaLahan(lahan1, weatherData1);

console.log("\n" + "=".repeat(50) + "\n");
