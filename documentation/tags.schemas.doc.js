/**
 * @openapi
 * components:
 *   schema:
 *     tagsUser:
 *       type:
 *         object
 *       properties:
 *         tag_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: string
 *           example: 6e621741-7c53-4088-b344-add42819d7de
 *         tags:
 *           type: 
 *             object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Deportes
 *     tagsBody:
 *       type:
 *         object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: foodie
 *         description:
 *           type: string
 *           example: About foodie
 *         image_url:
 *           type: string
 *           example: https://paracuando.s3.sa-east-1.amazonaws.com/user-image-6e621741-7c53-4088-b344-add42819d7de-3c52eaf5-c7c3-4b55-8970-d4da5a2e2ec4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZPEQWT3PYDA672WW%2F20230311%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230311T154841Z&X-Amz-Expires=518400&X-Amz-Signature=a132e8e6293914e1ff98e16af4998ce4fdc52f24fa323303d6181d57f95053df&X-Amz-SignedHeaders=host&x-id=GetObject
 *     tagsAdd:
 *       type:
 *         object
 *       properties:
 *         name:
 *           type: string
 *           example: foodie
 *         description:
 *           type: string
 *           example: About foodie
 */