/**
 * @openapi
 * /api/v1/publications-tupes:
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
 */