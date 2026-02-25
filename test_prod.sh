# ===============================
# 🌐 PRODUCTION URL
# ===============================
PROD_URL="https://express-prisma-z4x3.onrender.com"
BASE_URL="$PROD_URL"

echo "===== Testing on PROD ($BASE_URL) ====="

# ===============================
# 1️⃣ Login and get token
# ===============================
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.token')

echo "JWT Token: $TOKEN"

# ===============================
# 2️⃣ Get all posts
# ===============================
echo "=== All Posts ==="
curl -s -X GET "$BASE_URL/posts" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 3️⃣ Create new tag
# ===============================
TAG_ID=$(curl -s -X POST "$BASE_URL/tags" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"name":"Frontend"}' | jq -r '.id')

echo "Created Tag ID: $TAG_ID"

# ===============================
# 4️⃣ Create new post
# ===============================
POST_ID=$(curl -s -X POST "$BASE_URL/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d "{
  \"title\":\"Curl Test Post\",
  \"content\":\"This post content is long enough to pass validation.\",
  \"published\": true,
  \"tagIds\": [\"$TAG_ID\"]
}" | jq -r '.id')

echo "Created Post ID: $POST_ID"

# ===============================
# 5️⃣ Create new comment
# ===============================
COMMENT_ID=$(curl -s -X POST "$BASE_URL/comments" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d "{
  \"content\":\"This is a test comment via curl\",
  \"postId\":\"$POST_ID\"
}" | jq -r '.id')

echo "Created Comment ID: $COMMENT_ID"

# ===============================
# 6️⃣ Delete post
# ===============================
curl -s -X DELETE "$BASE_URL/posts/$POST_ID" \
-H "Authorization: Bearer $TOKEN"

echo "Deleted Post ID: $POST_ID"

# ===============================
# 7️⃣ Get all tags
# ===============================
echo "=== All Tags ==="
curl -s -X GET "$BASE_URL/tags" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 8️⃣ Get all comments
# ===============================
echo "=== All Comments ==="
curl -s -X GET "$BASE_URL/comments" \
-H "Authorization: Bearer $TOKEN" | jq