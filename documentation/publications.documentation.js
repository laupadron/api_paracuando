/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     summary: Get Filtered Publications
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: publications_types_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: publications_types_id
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication title
 *       - name: description
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication description
 *       - name: tags
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication tags
 *       - name: created_at
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: Publication created_at
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: {"count":5,"totalPages":1,"currentPages":1}
 *                 results:
 *                   type: array
 *                   $ref: '#/components/schema/publicationsUser'
 *                 belongs to:
 *                   type: object
 *                   $ref: '#/components/schema/updateUser'
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Publication
 *     tags:
 *       - [Publications]
 *     requestBody:
 *       description: Fields required to create a publication 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/createPublication'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: {"message": "Publication Add"}
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 * /api/v1/publications/{id}:
 *   get:
 *     summary: Get Detail Publications
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: {"count":5,"totalPages":1,"currentPages":1}
 *                 results:
 *                   type: array
 *                   $ref: '#/components/schema/publicationsUser'
 *                 belongs to:
 *                   type: object
 *                   $ref: '#/components/schema/updateUser'
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 *   delete:
 *     summary: Delet a publication
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: {"message": "Publication Removed"}
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 * /api/v1/publications/{id}/vote:
 *   post:
 *     summary: Add/Delete a vote in Publication
 *     tags:
 *       - [Publications]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: {"message": "Vote Add/Vote Removed"}
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found / something wrong
 */