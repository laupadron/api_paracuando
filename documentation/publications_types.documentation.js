/**
 * @openapi
 * /api/v1/publications-types:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get publications-types
 *     tags:
 *       - [Publications-Types]
 *     requestBody:
 *       description: Fields required to search a publication_type
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/searchPublicationType'
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
 *                   items:
 *                     $ref: '#/components/schema/publicationType'
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
 * /api/v1/publications-types/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Detail Publications-types
 *     tags:
 *       - [Publications-Types]
 *     parameters:
 *       - name: id
 *         in: query
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
 *                 result:
 *                   type: string
 *                   $ref: '#/components/schema/publicationType'
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
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update Publications-types
 *     tags:
 *       - [Publications-Types]
 *     parameters:
 *       - name: id
 *         in: query
 *         type: string
 *         required: true
 *     requestBody:
 *       description: Fields required to update a publication_type (Available only for administrators)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/updatePublicationType'
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
 *                   example: {"message": "Succes Update"}
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