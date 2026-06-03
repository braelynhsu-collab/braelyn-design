#!/bin/bash
# ============================================================
# Braelyn Design — 图片自动化工具
# 用法: bash optimize-images.sh [项目文件夹名]
# 示例: bash optimize-images.sh clinique-ebci-repush
#       bash optimize-images.sh              # 处理所有项目
# ============================================================
export PATH="$HOME/.local/bin:$PATH"
BASE="$(cd "$(dirname "$0")/images" && pwd)"

# 检查 cwebp
if ! command -v cwebp &>/dev/null; then
  echo "❌ 需要安装 cwebp"
  echo "   brew install webp"
  echo "   或从 https://developers.google.com/speed/webp/docs/precompiled 下载"
  exit 1
fi

# 处理单个项目
optimize_project() {
  local dir="$1"
  local name=$(basename "$dir")
  local converted=0
  local total_orig=0
  local total_webp=0

  echo ""
  echo "📁 $name"

  mkdir -p "$dir/webp"

  # 转换所有 PNG/JPG 到 WebP (quality 85)
  for img in "$dir"/*.{png,jpg,jpeg}; do
    [ -f "$img" ] || continue
    base=$(basename "${img%.*}")
    out="$dir/webp/$base.webp"

    # 如果已存在且更新，跳过
    [ -f "$out" ] && [ "$out" -nt "$img" ] && continue

    orig_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    cwebp -quiet -q 85 "$img" -o "$out" 2>/dev/null
    webp_size=$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out" 2>/dev/null)

    if [ "$orig_size" -gt 0 ] && [ "$webp_size" -gt 0 ]; then
      saving=$(( (orig_size - webp_size) * 100 / orig_size ))
      printf "  %-30s %s→ %s (%d%%)\n" "$base" \
        "$(echo "scale=1; $orig_size/1048576" | bc)MB " \
        "$(echo "scale=1; $webp_size/1048576" | bc)MB " \
        "$saving"
      total_orig=$((total_orig + orig_size))
      total_webp=$((total_webp + webp_size))
      converted=$((converted + 1))
    fi
  done

  # 清理旧的 jpg/ 目录（如果存在）
  [ -d "$dir/jpg" ] && rm -rf "$dir/jpg" && echo "  🗑️  已清理旧的 jpg/ 目录"

  if [ "$converted" -gt 0 ]; then
    total_saving=$(( (total_orig - total_webp) * 100 / total_orig ))
    printf "  ✅ %d张, 共 %s → %s (节省 %d%%)\n" "$converted" \
      "$(echo "scale=1; $total_orig/1048576" | bc)MB" \
      "$(echo "scale=1; $total_webp/1048576" | bc)MB" \
      "$total_saving"
  else
    echo "  ✅ 已是最新"
  fi
}

# 主逻辑
if [ -n "$1" ]; then
  # 处理单个项目
  target="$BASE/$1"
  if [ -d "$target" ]; then
    optimize_project "$target"
  else
    echo "❌ 项目 '$1' 不存在"
    echo "可用项目:"
    ls "$BASE/"
    exit 1
  fi
else
  # 处理所有项目
  echo "🔄 处理所有项目..."
  for dir in "$BASE"/*/; do
    [ -d "$dir" ] || continue
    name=$(basename "$dir")
    # 跳过空目录
    img_count=$(find "$dir" -maxdepth 1 -type f \( -name "*.png" -o -name "*.jpg" \) 2>/dev/null | wc -l)
    [ "$img_count" -gt 0 ] && optimize_project "$dir"
  done
fi

echo ""
echo "🎉 完成！"
