# CVNSS Preprints

**CVNSS Preprints** là kho preprint mở dành cho CVNSS4.0, xử lý tiếng Việt, biểu diễn trung gian ngôn ngữ, corpus, tokenizer, rule-audit, OCR/ASR, RAG và hạ tầng AI/NLP/LLM tiếng Việt.

Mô hình triển khai:

```text
GitHub        = kho nguồn mở, lưu PDF/source/metadata và lịch sử phiên bản
GitHub Pages  = mặt tiền kiểu arXiv mini để tra cứu, lọc, tải PDF, BibTeX, DOI
Zenodo        = archive GitHub Release và cấp DOI bền vững cho từng bản phát hành
```

Repo này **không công bố phép chuẩn nội bộ hoặc bộ luật converter chưa được phép mở**. Các bài báo, PDF, metadata, citation, benchmark mô tả và tài liệu công khai có thể đăng; các rule table, runtime PRO, khóa audit, dữ liệu nhạy cảm hoặc công thức chuẩn cần giữ kín phải đặt ngoài repo công khai.

## Demo hiện có

Bài mẫu đầu tiên:

```text
cvnss-2026-0001
CVNSS4.0 as an Experimental Orthographic-Audit Writing Model for Vietnamese
```

Thư mục bài mẫu:

```text
papers/cvnss-2026-0001/
├── paper.pdf
├── source.docx
├── abstract.md
├── metadata.yml
└── citation.bib
```

## Cấu trúc repo

```text
cvnss-preprints/
├── index.html                  # Giao diện GitHub Pages kiểu arXiv mini
├── assets/
│   ├── style.css
│   └── app.js
├── data/
│   └── papers.json             # Database nhẹ cho UI
├── papers/
│   ├── cvnss-2026-0001/        # Bài mẫu
│   └── _template/              # Template cho bài sau
├── scripts/
│   └── new_paper.py            # Sinh khung bài mới
├── docs/
│   ├── PUBLISHING.md           # Quy trình GitHub Pages + Zenodo DOI
│   ├── CITATION_POLICY.md      # Quy định trích dẫn/đăng lại
│   └── STANDARD_DISCLOSURE.md  # Chính sách giấu phép chuẩn
├── .github/workflows/pages.yml
├── .zenodo.json
├── CITATION.cff
├── LICENSE
└── LICENSE-PAPERS.md
```

## Cách thêm một bài mới

Chạy lệnh:

```bash
python scripts/new_paper.py \
  --id cvnss-2026-0002 \
  --title "Tiêu đề preprint mới" \
  --authors "Long Ngo; CVNSS Research Group" \
  --date 2026-07-06
```

Sau đó:

1. Thay `papers/cvnss-2026-0002/paper.pdf` bằng PDF thật.
2. Sửa `metadata.yml`, `abstract.md`, `citation.bib`.
3. Cập nhật `data/papers.json` hoặc thêm bản ghi mới theo mẫu.
4. Commit và push lên `main`.
5. GitHub Pages tự cập nhật mặt tiền arXiv mini.
6. Tạo GitHub Release cho bài hoặc phiên bản bài.
7. Zenodo archive release và cấp DOI.
8. Copy DOI ngược lại vào `metadata.yml`, `citation.bib`, `data/papers.json`.

## Quy ước mã bài

```text
cvnss-YYYY-NNNN
```

Ví dụ:

```text
cvnss-2026-0001
cvnss-2026-0002
cvnss-2027-0001
```

## License

- **Website code, UI, scripts**: MIT License.
- **Bài báo/preprint**: mặc định CC-BY-4.0, trừ khi `metadata.yml` ghi khác.
- **Phép chuẩn CVNSS4.0, rule table nội bộ, converter PRO, dữ liệu nhạy cảm**: không thuộc phạm vi MIT của repo này nếu không được công bố rõ ràng.

MIT là giấy phép phần mềm mã nguồn mở rất dễ dùng: cho phép sử dụng, sao chép, sửa đổi, phân phối, cấp phép lại và bán phần mềm, miễn là giữ nguyên thông báo bản quyền và thông báo giấy phép gốc.

## Trích dẫn

Khi đăng lại, dẫn lại, dùng nội dung hoặc dùng repo này làm nền cho kho preprint khác, vui lòng ghi rõ nguồn:

```text
CVNSS Preprints. GitHub-based arXiv-mini archive for CVNSS4.0 and Vietnamese NLP.
https://github.com/xulytiengviet/cvnss-preprints
```

Mỗi bài có `citation.bib` và DOI Zenodo sau khi release.
