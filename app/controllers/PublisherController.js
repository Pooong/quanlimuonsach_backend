const Published = require("../models/NhaXuatBan");
const NhaXuatBan = require("../models/NhaXuatBan");

class PublishedController {
	
	async listPublisher(req, res, next) {
		const searchQuery = req.query.search;
		console.log("OKE")

		if (searchQuery) {
			// const published = await Published.find({
			// 	TenNxb: { $regex: searchQuery, $options: "i" },
			// });
			const published = await Published.find();
			console.log(published);
			if (published.length > 0) {
				res.json(published);
			} else {
				res.json({ message: "Không tìm thấy nhà xuất bản" });
			}
		} else {
			Published.find()
				.then((nxbs) => {
					return res.send(nxbs);
				})
				.catch((err) => console.log(err));
		}
	}

	async addPublisher(req, res, next) {
		const data = req.body;
		console.log(req.body);
		console.log("OKW")
		try {
			const TenNxb = req.body.TenNxb;
			const DiaChi = req.body.DiaChi;
			console.log(TenNxb,DiaChi);
			const existingPublished = await Published.findOne({ TenNxb });
			if (existingPublished) {
			  return res.json({ update: "Nhà Xuất bản đã tồn tại" });
			} else {
			  const newNhaXuatBan = new Published({
				TenNxb,
				DiaChi,
			  });
			  await newNhaXuatBan.save();
			  return res.json({ message: "Đã thêm nhà xuất bản" });
			}
		  } catch (error) {
			console.log("Lỗi khi thêm nhà xuất bản", error);
			res
			  .status(500)
			  .json({ message: "Lỗi khi thêm nhà xuất bản", error: error.message });
		  }
	}

	
	async updatePublisher(req, res, next) {
		try {
			const id = req.params.id;
			console.log(id);
			console.log("HELLO DA CONNECT VO UPDATE");
			const existingPublished = await Published.findById(id);
			console.log(req.body);
			if (existingPublished) {
				if (req.body.TenNxb) {
					existingPublished.TenNxb = req.body.TenNxb;
				}
				if (req.body.DiaChi) {
					existingPublished.DiaChi = req.body.DiaChi;
				}
				await existingPublished.save();
				return res.json({ message: "Nhà xuất bản đã được cập nhật" });
			} else {
				return res.send({ error: "Cập nhật thất bại" });
			}
		} catch (error) {
			console.log("Lỗi khi cập nhật nhà xuất bản", error);
			res.status(500).json({ message: "Lỗi khi cập nhật nhà xuất bản" });
		}
	}

	async deletePublisher(req, res, next) {
		try {
			const id = req.params.id;
			console.log(id);
			const existingPublished = await Published.findById(id);
			if (!existingPublished) {
				return res.status(404).json({ error: "Không tìm thấy nhà xuất bản" });
			} else {
				await Published.findByIdAndDelete(id);
				return res.send({ message: "Xóa nhà xuất bản thành công" });
			}
		} catch (error) {
			console.log("Lỗi khi xóa nhà xuất bản", error);
			res.status(500).json({ message: "Lỗi khi xóa nhà xuất bản" });
		}
	}
}

module.exports = new PublishedController();
