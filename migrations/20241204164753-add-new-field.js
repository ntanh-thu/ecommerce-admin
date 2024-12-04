module.exports = {
  async up(db) {
    // Thêm field "status" với giá trị mặc định là "active"
    await db.collection("users").updateMany(
      {}, // Điều kiện áp dụng: tất cả documents
      { $set: { role: "ADMIN" } } // Field mới
    );
  },

  async down(db) {
    // Xóa field "status" nếu rollback
    await db.collection("users").updateMany(
      {}, // Điều kiện áp dụng: tất cả documents
      { $unset: { role: "" } } // Xóa field
    );
  },
};
