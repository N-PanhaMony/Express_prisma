# ===============================
# 🌐 PRODUCTION URL
# ===============================
PROD_URL="https://express-prisma-z4x3.onrender.com"
BASE_URL="$PROD_URL"

echo "===== Testing on PROD ($BASE_URL) ====="

# ===============================
# 1️⃣ Login as ADMIN
# ===============================
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.token')

echo "ADMIN Token: $TOKEN"

# ===============================
# 2️⃣ Register new user
# ===============================
echo "=== Register User ==="
curl -s -X POST "$BASE_URL/auth/register" \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}' | jq

# ===============================
# 3️⃣ Login as new user
# ===============================
NEW_TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{"email":"testuser@example.com","password":"password123"}' | jq -r '.token')

echo "USER Token: $NEW_TOKEN"

# ===============================
# 4️⃣ Create tags (setup)
# ===============================
TAG_ID=$(curl -s -X POST "$BASE_URL/tags" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"name":"Frontend"}' | jq -r '.id')

TAG2_ID=$(curl -s -X POST "$BASE_URL/tags" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"name":"Backend"}' | jq -r '.id')

echo "TAG_ID: $TAG_ID"
echo "TAG2_ID: $TAG2_ID"

# ===============================
# 5️⃣ Create post (ADMIN)
# ===============================
POST_ID=$(curl -s -X POST "$BASE_URL/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d "{
  \"title\":\"Admin Post\",
  \"content\":\"This post content is long enough to pass validation.\",
  \"published\": true,
  \"tagIds\": [\"$TAG_ID\"]
}" | jq -r '.id')

echo "Admin Post ID: $POST_ID"

# ===============================
# 6️⃣ Create post (USER)
# ===============================
USER_POST_ID=$(curl -s -X POST "$BASE_URL/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $NEW_TOKEN" \
-d '{
  "title":"User Post",
  "content":"This is a normal user post with enough content length.",
  "published": true
}' | jq -r '.id')

echo "User Post ID: $USER_POST_ID"

# ===============================
# 7️⃣ Add comment to admin post
# ===============================
COMMENT_ID=$(curl -s -X POST "$BASE_URL/comments" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $NEW_TOKEN" \
-d "{
  \"content\":\"User commenting on admin post\",
  \"postId\":\"$POST_ID\"
}" | jq -r '.id')

echo "Comment ID: $COMMENT_ID"

# ===============================
# 8️⃣ Unauthorized delete test
# ===============================
echo "=== Unauthorized Delete Test ==="
curl -s -X DELETE "$BASE_URL/posts/$USER_POST_ID" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 9️⃣ Create post with multiple tags
# ===============================
MULTI_POST_ID=$(curl -s -X POST "$BASE_URL/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d "{
  \"title\":\"Multi Tag Post\",
  \"content\":\"This post has multiple tags and enough content length.\",
  \"published\": true,
  \"tagIds\": [\"$TAG_ID\", \"$TAG2_ID\"]
}" | jq -r '.id')

echo "Multi Tag Post ID: $MULTI_POST_ID"

# ===============================
# 1️⃣1️⃣ Get all posts
# ===============================
echo "=== All Posts ==="
curl -s -X GET "$BASE_URL/posts" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 1️⃣2️⃣ Get all tags
# ===============================
echo "=== All Tags ==="
curl -s -X GET "$BASE_URL/tags" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 1️⃣3️⃣ Get all comments
# ===============================
echo "=== All Comments ==="
curl -s -X GET "$BASE_URL/comments" \
-H "Authorization: Bearer $TOKEN" | jq

# ===============================
# 1️⃣4️⃣ Cleanup (delete posts)
# ===============================
curl -s -X DELETE "$BASE_URL/posts/$POST_ID" \
-H "Authorization: Bearer $TOKEN"

curl -s -X DELETE "$BASE_URL/posts/$USER_POST_ID" \
-H "Authorization: Bearer $NEW_TOKEN"

echo "Cleanup done"