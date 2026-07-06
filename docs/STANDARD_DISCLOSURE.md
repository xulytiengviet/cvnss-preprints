# Chính sách công bố và bảo vệ phép chuẩn CVNSS4.0

## 1. Nguyên tắc

Repo `cvnss-preprints` là kho công bố học thuật và giao diện arXiv mini. Repo này không mặc định công bố toàn bộ phép chuẩn, rule table, converter PRO hoặc dữ liệu nội bộ.

## 2. Được phép công bố

```text
- Bài báo PDF
- Abstract
- Metadata
- BibTeX
- DOI Zenodo
- Tài liệu mô tả khái niệm
- Benchmark công khai đã lọc dữ liệu nhạy cảm
- Code UI/UX của GitHub Pages
```

## 3. Không đưa lên repo công khai nếu chưa muốn mở

```text
- Rule table chuẩn chưa công bố
- Runtime converter PRO
- File chứa công thức chuẩn chi tiết
- Dữ liệu cá nhân, dữ liệu hành chính, corpus chưa có quyền
- Khóa API, token, secret
- Bộ test private hoặc gold data chưa được phép công bố
```

## 4. Cách ghi trong bài báo

Có thể viết:

```text
The public preprint provides the conceptual model, metadata, and reproducible publication record. The protected converter runtime and official rule table are not included in this public release unless explicitly stated.
```

## 5. Gợi ý quản trị

Dùng repo private riêng cho phần nội bộ:

```text
cvnss-standard-private
cvnss-converter-pro-private
cvnss-gold-tests-private
```

Repo public chỉ giữ phần công bố được.
