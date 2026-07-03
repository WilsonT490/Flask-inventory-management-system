from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# ==============================
# In-memory Inventory Database
# ==============================
inventory = [
    {
        "id": 1,
        "name": "Milk",
        "barcode": "3017620422003",
        "price": 3.50,
        "quantity": 10
    },
    {
        "id": 2,
        "name": "Bread",
        "barcode": "7622210449283",
        "price": 2.25,
        "quantity": 15
    }
]

# ==============================
# GET ALL ITEMS
# ==============================
@app.route("/inventory", methods=["GET"])
def get_inventory():
    return jsonify(inventory), 200


# ==============================
# GET ONE ITEM
# ==============================
@app.route("/inventory/<int:item_id>", methods=["GET"])
def get_item(item_id):

    item = next((item for item in inventory if item["id"] == item_id), None)

    if item:
        return jsonify(item), 200

    return jsonify({"error": "Item not found"}), 404


# ==============================
# ADD ITEM
# ==============================
@app.route("/inventory", methods=["POST"])
def add_item():

    data = request.get_json()

    required = ["name", "barcode", "price", "quantity"]

    if not data:
        return jsonify({"error": "No data provided"}), 400

    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    new_item = {
        "id": len(inventory) + 1,
        "name": data["name"],
        "barcode": data["barcode"],
        "price": float(data["price"]),
        "quantity": int(data["quantity"])
    }

    inventory.append(new_item)

    return jsonify(new_item), 201


# ==============================
# UPDATE ITEM
# ==============================
@app.route("/inventory/<int:item_id>", methods=["PATCH"])
def update_item(item_id):

    item = next((item for item in inventory if item["id"] == item_id), None)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()

    if "name" in data:
        item["name"] = data["name"]

    if "barcode" in data:
        item["barcode"] = data["barcode"]

    if "price" in data:
        item["price"] = float(data["price"])

    if "quantity" in data:
        item["quantity"] = int(data["quantity"])

    return jsonify(item), 200


# ==============================
# DELETE ITEM
# ==============================
@app.route("/inventory/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):

    item = next((item for item in inventory if item["id"] == item_id), None)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    inventory.remove(item)

    return jsonify({"message": "Item deleted successfully"}), 200


# ==============================
# INVENTORY SUMMARY
# ==============================
@app.route("/summary", methods=["GET"])
def summary():

    total_products = len(inventory)
    total_stock = sum(item["quantity"] for item in inventory)
    total_value = sum(item["price"] * item["quantity"] for item in inventory)

    return jsonify({
        "products": total_products,
        "stock": total_stock,
        "value": round(total_value, 2)
    }), 200


# ==============================
# FETCH PRODUCT FROM OPENFOODFACTS
# =============================
@app.route("/fetch-product/<barcode>", methods=["GET"])
def fetch_product(barcode):

    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"

    try:
        headers = {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )
        response.raise_for_status()

        data = response.json()

        if data.get("status") == 0:
            return jsonify({"error": "Product not found"}), 404

        product = data.get("product", {})

        return jsonify({
            "name": product.get("product_name", ""),
            "brand": product.get("brands", ""),
            "category": product.get("categories", ""),
            "barcode": barcode
        }), 200

    except requests.RequestException:
        return jsonify({"error": "Unable to connect to OpenFoodFacts"}), 500


# ==============================
# RUN APP
# ==============================
if __name__ == "__main__":
    app.run(debug=True)
