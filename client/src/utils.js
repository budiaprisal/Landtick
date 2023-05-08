export function ConvertFormatRupiah(number){
    return new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0, style: 'currency', currency: 'IDR' }).format(number)
}

export function ConvertFormatDate(date){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date  = new Date();
    return date.toLocaleString("en-US",options)
}


// Fungsi pertama bernama "ConvertFormatRupiah" dan menerima satu parameter bernama "number".
//  Fungsi ini mengembalikan nilai dalam bentuk string dengan format uang Rupiah (IDR).
//   Nilai parameter "number" akan diubah menjadi format Rupiah 
//   dengan menggunakan objek "Intl.NumberFormat" yang disediakan oleh JavaScript.
//    Objek ini memiliki properti yang digunakan untuk menentukan format angka,
//     seperti jumlah digit desimal, style, dan currency. Pada kode tersebut, 
//     properti minimumFractionDigits diatur sebagai 0 (tanpa angka desimal), 
//     style diatur sebagai currency, dan currency diatur sebagai IDR.

// Fungsi kedua bernama "ConvertFormatDate" dan menerima satu parameter bernama "date". 
// Fungsi ini mengembalikan nilai dalam bentuk string dengan format tanggal yang sesuai 
// dengan bahasa Inggris (en-US). Fungsi ini menggunakan objek "Date" yang disediakan
//  oleh JavaScript untuk mengubah nilai parameter "date" menjadi format tanggal yang 
//  sesuai dengan opsi yang diatur pada variabel "options". Pada kode tersebut,
//   variabel "options" berisi properti-properti untuk menampilkan hari, tahun, bulan, dan tanggal 
//   dengan format tertentu. Setelah nilai "date" diubah menjadi format tanggal yang sesuai, nilai tersebut
//    akan dikembalikan sebagai string dengan menggunakan metode "toLocaleString".