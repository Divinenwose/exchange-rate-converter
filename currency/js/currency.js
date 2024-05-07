const select = document.querySelectorAll("select")
const input = document.querySelectorAll("input")
const resultElement = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn")
const apiUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_wR32h6IUMsVZZoKb2zLfeifRuOalnBePhMHAr757"
let html = ""
let response

const currencyToCountryCodes = {
    AED: ["AE"], 
    AFN: ["AF"], 
    ALL: ["AL"], 
    AMD: ["AM"],
    ANG: ["CW", "SX"], 
    AOA: ["AO"], 
    ARS: ["AR"], 
    AUD: ["AU", "CC", "CX", "HM", "KI", "NR", "NF", "TV"],
    AWG: ["AW"], 
    AZN: ["AZ"],
    BAM: ["BA"], 
    BBD: ["BB"], 
    BDT: ["BD"], 
    BGN: ["BG"], 
    BHD: ["BH"], 
    BIF: ["BI"], 
    BMD: ["BM"], 
    BND: ["BN"], 
    BOB: ["BO"], 
    BRL: ["BR"], 
    BSD: ["BS"], 
    BTN: ["BT"], 
    BWP: ["BW"], 
    BYN: ["BY"], 
    BZD: ["BZ"], 
    CAD: ["CA"], 
    CDF: ["CD"], 
    CHF: ["CH", "LI"], 
    CLP: ["CL"], 
    CNY: ["CN"], 
    COP: ["CO"], 
    CRC: ["CR"], 
    CUC: ["CU"], 
    CUP: ["CU"], 
    CVE: ["CV"], 
    CZK: ["CZ"], 
    DJF: ["DJ"], 
    DKK: ["DK", "FO", "GL"], 
    DOP: ["DO"], 
    DZD: ["DZ"], 
    EGP: ["EG"], 
    ERN: ["ER"], 
    ETB: ["ET"], 
    EUR: ["AD", "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "XK", "LV", "LT", "LU", "MT", "MC", "ME", "NL", "PT", "SM", "SK", "SI", "ES", "VA"], 
    FJD: ["FJ"], 
    FKP: ["FK"], 
    GBP: ["GB", "GG", "IM", "JE"], 
    GEL: ["GE"], 
    GHS: ["GH"], 
    GIP: ["GI"], 
    GMD: ["GM"], 
    GNF: ["GN"], 
    GTQ: ["GT"], 
    GYD: ["GY"], 
    HKD: ["HK"], 
    HNL: ["HN"], 
    HRK: ["HR"], 
    HTG: ["HT"], 
    HUF: ["HU"], 
    IDR: ["ID"], 
    ILS: ["IL"], 
    INR: ["IN"], 
    IQD: ["IQ"], 
    IRR: ["IR"], 
    ISK: ["IS"], 
    JMD: ["JM"], 
    JOD: ["JO"], 
    JPY: ["JP"], 
    KES: ["KE"], 
    KGS: ["KG"], 
    KHR: ["KH"], 
    KMF: ["KM"], 
    KPW: ["KP"], 
    KRW: ["KR"], 
    KWD: ["KW"], 
    KYD: ["KY"], 
    KZT: ["KZ"], 
    LAK: ["LA"], 
    LBP: ["LB"], 
    LKR: ["LK"], 
    LRD: ["LR"], 
    LSL: ["LS"], 
    LYD: ["LY"], 
    MAD: ["MA"], 
    MDL: ["MD"], 
    MGA: ["MG"], 
    MKD: ["MK"], 
    MMK: ["MM"], 
    MNT: ["MN"], 
    MOP: ["MO"], 
    MRO: ["MR"], 
    MRU: ["MR"], 
    MUR: ["MU"], 
    MVR: ["MV"], 
    MWK: ["MW"], 
    MXN: ["MX"], 
    MYR: ["MY"], 
    MZN: ["MZ"], 
    NAD: ["NA"], 
    NGN: ["NG"], 
    NIO: ["NI"], 
    NOK: ["NO", "SJ"], 
    NPR: ["NP"], 
    NZD: ["NZ", "CK", "NU", "PN", "TK"], 
    OMR: ["OM"], 
    PAB: ["PA"], 
    PEN: ["PE"], 
    PGK: ["PG"], 
    PHP: ["PH"], 
    PKR: ["PK"], 
    PLN: ["PL"], 
    PYG: ["PY"], 
    QAR: ["QA"], 
    RON: ["RO"], 
    RSD: ["RS"], 
    RUB: ["RU"], 
    RWF: ["RW"], 
    SAR: ["SA"], 
    SBD: ["SB"], 
    SCR: ["SC"], 
    SDG: ["SD"], 
    SEK: ["SE"], 
    SGD: ["SG"], 
    SHP: ["SH"], 
    SLL: ["SL"], 
    SOS: ["SO"], 
    SRD: ["SR"], 
    SSP: ["SS"], 
    STN: ["ST"], 
    SVC: ["SV"], 
    SYP: ["SY"], 
    SZL: ["SZ"], 
    THB: ["TH"], 
    TJS: ["TJ"], 
    TMT: ["TM"], 
    TND: ["TN"], 
    TOP: ["TO"], 
    TRY: ["TR"], 
    TTD: ["TT"], 
    TWD: ["TW"], 
    TZS: ["TZ"], 
    UAH: ["UA"], 
    UGX: ["UG"], 
    USD: ["US", "AS", "BQ", "IO", "EC", "SV", "GU", "HT", "MH", "FM", "MP", "PW", "PA", "PR", "TL", "TC", "VI", "VG", "UM"],
    UYU: ["UY"], 
    UZS: ["UZ"], 
    VES: ["VE"], 
    VND: ["VN"], 
    VUV: ["VU"], 
    WST: ["WS"], 
    XAF: ["CM", "CF", "TD", "CG", "GQ", "GA"], 
    XCD: ["AG", "AI", "DM", "GD", "MS", "KN", "LC", "VC"], 
    XOF: ["BJ", "BF", "CI", "GW", "ML", "NE", "SN", "TG"], 
    XPF: ["PF", "NC", "WF"],
    YER: ["YE"], 
    ZAR: ["ZA", "LS", "NA"], 
    ZMW: ["ZM"], 
    ZWL: ["ZW"], 
}

async function currency(){
    const result = await fetch(apiUrl);
     response = await result.json();

    if (!response || !response.data) {
        console.error('Failed to load currency rates');
        return; 
    }

    const arrKeys = Object.keys(response.data);
    html = arrKeys.map(item => `<option value="${item}">${item}</option>`).join('');

    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
    }

    select[0].value = 'USD';
    select[1].value = 'NGN';

    updateFlag(select[0], document.querySelector("#from-select-container img"));
    updateFlag(select[1], document.querySelector("#to-select-container img"));
}

function updateFlag(selectElement, imgElement) {
    const countryCode = currencyToCountryCodes[selectElement.value][0];
    imgElement.src = `https://flagsapi.com/${countryCode}/flat/48.png`;
}

select.forEach(sel => {
    sel.addEventListener('change', function() {
        const imgElement = this.parentElement.querySelector("img");
        updateFlag(this, imgElement);
    });
});




function convertCurrency() {
    const fromCurrency = select[0].value;
    const toCurrency = select[1].value;
    const amount = parseFloat (input[0].value);

    if (isNaN(amount)) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }else if (fromCurrency && toCurrency && amount) {
        const fromRate = response.data[fromCurrency].value;
        const toRate = response.data[toCurrency].value;

        const convertedAmount = (amount * toRate) / fromRate;
        input[1].value = convertedAmount.toFixed(2);

        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
    }
}

convertBtn.addEventListener("click", convertCurrency);

currency();