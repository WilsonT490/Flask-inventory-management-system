import unittest
from urllib import response
from app import app, inventory

class InventoryAPITestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

        # Reset inventory before each test
        inventory.clear()
        inventory.extend([
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
        ])

    def test_get_inventory(self):
        response = self.client.get("/inventory")
        self.assertEqual(response.status_code, 200)

        data = response.get_json()

        self.assertEqual(len(data), 2)

    def test_get_single_item(self):
        response = self.client.get("/inventory/1")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.get_json()["name"], "Milk")

    def test_add_item(self):

        response = self.client.post(
            "/inventory",
            json={
                "name": "Juice",
                "barcode": "123456",
                "price": 5.25,
                "quantity": 8
            }
        )

        self.assertEqual(response.status_code, 201)

        self.assertEqual(response.get_json()["name"], "Juice")

    def test_update_item(self):

        response = self.client.patch(
            "/inventory/1",
            json={
                "price": 4.50,
                "quantity": 20
            }
        )

        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.get_json()["price"], 4.50)

    def test_delete_item(self):

        response = self.client.delete("/inventory/1")

        self.assertEqual(response.status_code, 200)

    def test_summary(self):

        response = self.client.get("/summary")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()

        self.assertEqual(data["products"], 2)

    def test_fetch_product(self):
        response = self.client.get("/fetch-product/3017620422003")

        self.assertIn(response.status_code, [200, 404, 500])

if __name__ == "__main__":
    unittest.main()