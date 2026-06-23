import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedAddresses() {
  const isMobile = window.innerWidth <= 768;
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  fetchAddresses();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/address"
      );

      const userAddresses = res.data.filter(
        (address) =>
          address.user === user?.id ||
          address.user?._id === user?.id
      );

      setAddresses(userAddresses);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch addresses");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/address/${id}`
      );

      alert("✅ Address deleted successfully");

      fetchAddresses();

    } catch (error) {
      console.error(error);

      alert("❌ Failed to delete address");
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);

    setEditData({
      fullName: address.fullName,
      mobile: address.mobile,
      houseNo: address.houseNo,
      street: address.street,
      landmark: address.landmark || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      addressType: address.addressType,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/address/${editingId}`,
        editData
      );

      alert("✅ Address updated successfully");

      setEditingId(null);

      fetchAddresses();

    } catch (error) {
      console.error(error);

      alert("❌ Failed to update address");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        📍 Saved Addresses
      </h1>

      {addresses.length === 0 ? (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>No Saved Addresses Found</h3>

          <p>
            Save an address during checkout.
          </p>
        </div>
      ) : (
        addresses.map((address) => (
          <div
            key={address._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: isMobile ? "15px" : "20px",
              marginBottom: "20px",
              background: "#fff",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            {editingId === address._id ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={editData.fullName}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      fullName: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Mobile"
                  value={editData.mobile}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      mobile: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="House No"
                  value={editData.houseNo}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      houseNo: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Street"
                  value={editData.street}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      street: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Landmark"
                  value={editData.landmark}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      landmark: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={editData.city}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      city: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="State"
                  value={editData.state}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      state: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={editData.pincode}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      pincode: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <select
                  value={editData.addressType}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      addressType: e.target.value,
                    })
                  }
                  style={inputStyle}
                >
                  <option value="Home">
                    Home
                  </option>

                  <option value="Office">
                    Office
                  </option>
                </select>

                <button
                  onClick={handleUpdate}
                  style={{
                    padding: "10px 15px",
                    background: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  ✅ Update
                </button>

                <button
                  onClick={() =>
                    setEditingId(null)
                  }
                  style={{
                    padding: "10px 15px",
                    background: "#999",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{address.fullName}</h3>

                <p>
                  📞 {address.mobile}
                </p>

                <p>
                  {address.houseNo},{" "}
                  {address.street}
                </p>

                {address.landmark && (
                  <p>
                    Landmark:{" "}
                    {address.landmark}
                  </p>
                )}

                <p>
                  {address.city},{" "}
                  {address.state} -{" "}
                  {address.pincode}
                </p>

                <p>
                  <strong>
                    🏠 {address.addressType}
                  </strong>
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleEdit(address)
                    }
                    style={{
                      padding: "10px 15px",
                      background: "#2196F3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        address._id
                      )
                    }
                    style={{
                      padding: "10px 15px",
                      width: isMobile ? "100%" : "auto",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
};

export default SavedAddresses;

