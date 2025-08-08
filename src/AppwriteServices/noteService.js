import { Client, Databases, ID } from 'appwrite'
import conf from '../conf/conf'
import { Query } from "appwrite";

class NoteService {
    client = new Client()
    database

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.database = new Databases(this.client)
    }

    async addNote({ title, content, userId, textColor = 'black' }) {
        try {
            return await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                ID.unique(),
                {
                    title: title,
                    content: content,
                    userIdRef: userId,
                    completed: false,
                    textColor: textColor
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deleteNote( noteId ) {
        try {
            return await this.database.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                noteId
            )
        } catch (error) {
            console.log(error);
        }

    }

    async editNote({ noteId, title, content }) {
        try {
            return await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                noteId,
                {
                    title: title,
                    content: content,
                }
            )
        } catch (error) {
            console.log(error);
        }
    }



    async getUserNotes( userId ) {
        if (!userId) {
            console.warn("No userId provided to getUserNotes")
            return null
        }

        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                [
                    Query.equal('userIdRef', userId)
                ]
            )
        } catch (error) {
            console.error("Error fetching user notes:", error)
            return null
        }
    }


}

export default NoteService;
export const noteServe = new NoteService();