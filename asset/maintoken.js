let account;
let web3Modal;
let provider;
let contractOld;
let walletConnector;

const contractAddress = '0xC6c20D2C6Ae3cBA23455be02a13cE87Fa7D49deE';
const chainIdx = 59;
const gaslimit = 160000;
var gasprice = 5 * 1e9;
const basic_url = 'https://www.xandratoken.com/';


function formatNumber(value) {
    let val = (value / 1).toFixed(2).replace(/\.0+$/, ''); //.replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

window.addEventListener('DOMContentLoaded', async (event) => {

    $('.sc-1').html(`<a target="_blank" href="https://bscscan.com/address/${contractAddress}">Contract address : ${contractAddress} </a>`);
    $('.sc-2').html(`<a target="_blank" href="https://bscscan.com/address/${contractAddress}">SC Veriefed: ${contractAddress}  </a>`);

    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;


    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    1: 'https://bsc-dataseed1.defibit.io',
                    56: 'https://bsc-dataseed1.defibit.io',
                    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
                },
                chainId: 56,
                network: "binance",
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });


    function querySt(ji) {

        hu = window.location.search.substring(1);
        gy = hu.split("&");

        for (i = 0; i < gy.length; i++) {
            ft = gy[i].split("=");
            if (ft[0] == ji) {
                return ft[1];
            }
        }
    }

    function copy() {
        var copyText = document.getElementById("my_reff");
        copyText.value = basic_url + '?ref=' + copyText.value;


        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        return polipop.add({
            type: 'success',
            title: 'Success Copy on Clipboard',
            content: basic_url + '?ref=' + document.getElementById('my_reff').value,
        });


    }


    $(document).on('click', '.btn-getreff', async function () {
        if (account) {} else {
            await onConnect();
            copy();
            /* Select the text field */
            // var copyText = document.getElementById('my_reff').value;

        }
    })




    var ref = querySt("ref");

    if (ref == null) {
        document.getElementById('reff-address').value = '0x0000000000000000000000000000000000000000';
    } else {
        document.getElementById('reff-address').value = ref;
    }


    const referralNewAction = async () => {
        try {
            document.getElementById('my_reff').value = account.value;

            if (provider && provider.isMetaMask) {
                $('.btn-add-meta').show();
            } else {
                $('.btn-add-meta').hide();
            }

            if (!!account) {
                console.log(account);
                document.getElementById('my_reff').value = account;
                $('.btn-connect').hide();
                // $('.btn-presale').show();
                if (tokenValue.value < 0.001 || tokenValue.value > 10) {
                    $('.btn-presale').hide();
                } else {
                    $('.btn-presale').show();
                }
                // $('.logged-account').html(`<span>${account}</span> <button class="btn btn-primary mx-auto mt-3 text-light w-50 btn-logout">Logout</button>`)
            } else {
                $('.btn-connect').show();
                $('.logged-account').html('');
            }

        } catch (e) {
            $('.referral-actions').html('Error:', e.toString());
        }
    };

    setInterval(() => referralNewAction(), 5000)



    tokenValue.addEventListener('keyup', function () {
        if (!!account) {
            if (tokenValue.value < 0.001 || tokenValue.value > 10) {
                buyButton.style.display = 'none';
            } else {
                buyButton.style.display = 'inherit';
            }
        }
    })
    tokenValue.addEventListener('change', function () {
        if (!!account) {
            if (tokenValue.value < 0.001 || tokenValue.value > 10) {
                buyButton.style.display = 'none';
            } else {
                buyButton.style.display = 'inherit';

            }
        }
    })


    const fetchAccountData = async () => {
        web3 = new Web3(provider);
        contractExt = new web3.eth.Contract(abi, contractAddress);
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log('accounts:', accounts);
        referralNewAction();
    }

    const onConnect = async () => {
        try {
            provider = await web3Modal.connect();
        } catch (e) {
            console.log("Could not get a wallet connection", e);
            return;
        }

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            console.log('accounts:', accounts);
            referralNewAction();
        });
        // Subscribe to chainId change
        provider.on("chainChanged", (chainIdx) => {
            console.log('chainChanged :', accounts);
            referralNewAction();
        });

        // Subscribe to networkId change
        provider.on("networkChanged", (chainIdx) => {
            console.log('networkChanged :', accounts);
            referralNewAction();
        });
        return await fetchAccountData();
    }

    if (web3Modal.cachedProvider) {
        onConnect();
    }

    $(document).on('click', '.btn-connect', onConnect);

    $(document).on('click', '.btn-logout', async function () {
        referralNewAction();
        if (provider.close) {
            await provider.close();
            await web3Modal.clearCachedProvider();
        }
        provider = null;
        account = null;
        referralNewAction();
    })

    $(document).on('click', '.btn-presale', async function () {
        let ethval = document.getElementById("tokenValue").value

        if (ethval < 0.01) {
            Swal.fire({
                title: 'Pre-Sale Oders',
                icon: 'error',
                html: 'Minium buy presale 0.01 BNB',
                showCloseButton: true,
                focusConfirm: false,
                reverseButtons: true,
                focusCancel: true,
                cancelButtonText: 'Exit',
            });
        } else {
            if (account) {
                try {
                    ;
                    let fresh = document.getElementById("reff-address").value;
                    ethval = Number(ethval) * 1e18;

                    let resultBuy = false;
                    console.log('result buy: ' + resultBuy);

                    resultBuy = await contractExt.methods._presale(fresh).send({
                        from: account,
                        value: ethval,
                        gas: gaslimit,
                        gasPrice: gasprice,
                    });

                    console.log('result buy: ' + resultBuy);

                    referralNewAction();
                } catch (e) {
                    console.log('Error:', e.message)
                } finally {
                    console.log('ok beli')
                }
            } else {
                await onConnect();
                try {
                    let fresh = document.getElementById("reff-address").value;
                    ethval = Number(ethval) * 1e18;
                    let resultBuy = false;
                    resultBuy = await contractExt.methods._presale(fresh).send({
                        from: account,
                        value: ethval,
                        gas: gaslimit,
                        gasPrice: gasprice,
                    });
                    console.log('result buy: ' + resultBuy);
                    referralNewAction();
                } catch (e) {
                    console.log('Error:', e.message)
                }
            }
        }


    });


    $(document).on('click', '.btn-airdrop', async function () {
        if (account) {
            try {
                let fresh = document.getElementById("reff-address").value;
                let ethval = 0.002;
                let resultClaim = false;
                console.log('result claim: ' + resultClaim);
                ethval = Number(ethval) * 1e18;
                await contractExt.methods._limiteddrop(fresh).send({
                    from: account,
                    value: ethval,
                    gas: gaslimit,
                    gasPrice: gasprice,
                });
                console.log('result buy: ' + resultClaim);
                referralNewAction();
            } catch (e) {
                console.log('Error:', e.message);
            }
        } else {
            await onConnect();
            try {
                let fresh = document.getElementById("reff-address").value;
                let ethval = 0.002;
                let resultClaim = false;
                console.log('result claim: ' + resultClaim);
                ethval = Number(ethval) * 1e18;

                await contractExt.methods._limiteddrop(fresh).send({
                    from: account,
                    value: ethval,
                    gas: gaslimit,
                    gasPrice: gasprice,
                });
                console.log('result buy: ' + resultClaim);
                referralNewAction();
            } catch (e) {
                console.log('Error:', e.message);
            }
        }
    });



    $(document).on('click', '.btn-add-meta', async function () {
        provider.isMetaMask && provider.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'BEP20',
                options: {
                    address: contractAddress,
                    symbol: 'XNDR',
                    decimals: 8,
                    image: 'https://godzilatoken.com/assets/fav.png',
                },
            }
        });

    });



})