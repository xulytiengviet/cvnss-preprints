#!/usr/bin/env python3
"""Create a new CVNSS Preprints paper folder from the built-in template."""
from __future__ import annotations

import argparse
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parents[1]


def slug_key(paper_id: str) -> str:
    return paper_id.replace('-', '')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--id', required=True, help='Paper ID, e.g. cvnss-2026-0002')
    parser.add_argument('--title', required=True, help='Paper title')
    parser.add_argument('--authors', required=True, help='Authors separated by semicolon')
    parser.add_argument('--date', default=str(date.today()), help='Submission date YYYY-MM-DD')
    args = parser.parse_args()

    paper_dir = ROOT / 'papers' / args.id
    if paper_dir.exists():
        raise SystemExit(f'Folder already exists: {paper_dir}')
    paper_dir.mkdir(parents=True)

    authors = [a.strip() for a in args.authors.split(';') if a.strip()]
    author_yaml = '\n'.join(f'  - "{a}"' for a in authors)
    author_bib = ' and '.join(authors)

    (paper_dir / 'abstract.md').write_text(f'''# {args.title}

**Mã bài:** {args.id}  
**Phiên bản:** v1.0.0  
**Ngày gửi:** {args.date}  
**DOI Zenodo:** pending

## Abstract

Viết tóm tắt 150-250 từ.

## Citation

Sau khi tạo GitHub Release và Zenodo cấp DOI, cập nhật `citation.bib`, `metadata.yml` và `data/papers.json`.
''', encoding='utf-8')

    (paper_dir / 'metadata.yml').write_text(f'''id: {args.id}
title: "{args.title}"
authors:
{author_yaml}
year: {args.date[:4]}
submitted: {args.date}
status: preprint
version: 1.0.0
categories:
  - CVNSS4.0
  - Vietnamese NLP
keywords:
  - CVNSS
  - NLP
license: CC-BY-4.0
repository: https://github.com/xulytiengviet/cvnss-preprints
pages: https://xulytiengviet.github.io/cvnss-preprints/
pdf: papers/{args.id}/paper.pdf
source: papers/{args.id}/source.docx
bibtex: papers/{args.id}/citation.bib
doi: ""
doi_status: pending
protected_standard_note: "Do not include protected CVNSS rule tables or converter runtime unless explicitly approved."
''', encoding='utf-8')

    (paper_dir / 'citation.bib').write_text(f'''@misc{{{slug_key(args.id)},
  title        = {{{args.title}}},
  author       = {{{author_bib}}},
  year         = {{{args.date[:4]}}},
  howpublished = {{CVNSS Preprints}},
  note         = {{Preprint, version 1.0.0. DOI pending Zenodo release.}},
  url          = {{https://xulytiengviet.github.io/cvnss-preprints/}}
}}
''', encoding='utf-8')

    (paper_dir / 'README.md').write_text(f'''# {args.id}

Đặt file PDF bài báo tại:

```text
papers/{args.id}/paper.pdf
```

Đặt source tại:

```text
papers/{args.id}/source.docx
```

Sau đó cập nhật `data/papers.json` để bài xuất hiện trên giao diện GitHub Pages.
''', encoding='utf-8')

    print(f'Created {paper_dir}')


if __name__ == '__main__':
    main()
