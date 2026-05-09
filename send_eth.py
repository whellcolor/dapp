# send_eth.py

from web3 import Web3

# ======================================
# RPC
# ======================================

RPC_URL = "https://ethereum-holesky-rpc.publicnode.com"

w3 = Web3(Web3.HTTPProvider(RPC_URL))

# ======================================
# WALLET CONFIG
# ======================================

private_key = "AIzaSyDO_WlJ7nHoe7T6udRU_wHO-TaW_LcZlTc"

account = w3.eth.account.from_key(private_key)

sender = account.address

receiver = "0xd8519a8b8825aa0dcc73aad572f447fae102fe88"

# ======================================
# AMOUNT
# ======================================

amount_eth = 9.9

# ======================================
# NONCE
# ======================================

nonce = w3.eth.get_transaction_count(sender)

# ======================================
# TRANSACTION
# ======================================

tx = {
    "nonce": nonce,
    "to": receiver,
    "value": w3.to_wei(amount_eth, "ether"),
    "gas": 21000,
    "gasPrice": w3.eth.gas_price,
    "chainId": 17000  # Holesky
}

# ======================================
# SIGN
# ======================================

signed_tx = w3.eth.account.sign_transaction(
    tx,
    private_key
)

# ======================================
# SEND
# ======================================

tx_hash = w3.eth.send_raw_transaction(
    signed_tx.raw_transaction
)

print("TX HASH:")
print(w3.to_hex(tx_hash))

print("SUCCESS SEND", amount_eth, "ETH")
