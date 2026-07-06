# Quy trình công bố CVNSS Preprints: GitHub Pages + Zenodo DOI

## 1. Nguyên tắc

CVNSS Preprints dùng GitHub làm kho công bố mở và GitHub Pages làm mặt tiền kiểu arXiv mini. Zenodo được kết nối với GitHub để archive từng GitHub Release và cấp DOI bền vững.

```text
PDF/source/metadata -> GitHub commit -> GitHub Pages -> GitHub Release -> Zenodo DOI
```

## 2. Chuẩn bị repo

Tạo repo công khai:

```text
https://github.com/xulytiengviet/cvnss-preprints
```

Đẩy toàn bộ template lên `main`:

```bash
git init
git branch -M main
git add .
git commit -m "Initial CVNSS Preprints archive"
git remote add origin https://github.com/xulytiengviet/cvnss-preprints.git
git push -u origin main
```

## 3. Bật GitHub Pages

Vào repo:

```text
Settings -> Pages -> Source: GitHub Actions
```

Workflow có sẵn tại:

```text
.github/workflows/pages.yml
```

URL dự kiến:

```text
https://xulytiengviet.github.io/cvnss-preprints/
```

## 4. Thêm bài mới

Dùng script:

```bash
python scripts/new_paper.py \
  --id cvnss-2026-0002 \
  --title "Tiêu đề bài mới" \
  --authors "Long Ngo; CVNSS Research Group" \
  --date 2026-07-06
```

Mỗi bài phải có tối thiểu:

```text
paper.pdf
abstract.md
metadata.yml
citation.bib
```

Nên có thêm:

```text
source.docx hoặc source.tex
supplementary/
code/
data/
```

## 5. Tạo GitHub Release để Zenodo cấp DOI

Ví dụ release cho bài đầu tiên:

```text
Tag: v2026.0001
Title: cvnss-2026-0001 v1.0.0
Description: First public preprint release for cvnss-2026-0001.
```

Sau khi publish release, Zenodo sẽ archive và cấp DOI nếu repo đã được bật trong Zenodo.

## 6. Cập nhật DOI ngược về repo

Khi Zenodo cấp DOI, sửa 3 nơi:

```text
papers/cvnss-YYYY-NNNN/metadata.yml
data/papers.json
papers/cvnss-YYYY-NNNN/citation.bib
```

Commit:

```bash
git add .
git commit -m "Add Zenodo DOI for cvnss-YYYY-NNNN"
git push
```

## 7. Chiến lược DOI

Khuyến nghị dùng một repo trung tâm và mỗi bài/phiên bản lớn là một release:

```text
v2026.0001       -> DOI cho cvnss-2026-0001 v1
v2026.0001-v2    -> DOI cho cvnss-2026-0001 v2
v2026.0002       -> DOI cho cvnss-2026-0002 v1
```

Lưu ý: Zenodo DOI gắn với GitHub Release. Nếu một release chứa nhiều bài, DOI sẽ đại diện cho cả release đó, không phải riêng từng bài.
