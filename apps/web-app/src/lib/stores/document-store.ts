export interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  type: 'document'
}

class DocumentStore {
  private documents: Map<string, Document> = new Map()
  private listeners: Set<() => void> = new Set()

  constructor() {
    // Load documents from localStorage on initialization
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('documents')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          Object.entries(parsed).forEach(([id, doc]) => {
            this.documents.set(id, {
              ...(doc as Document),
              createdAt: new Date((doc as any).createdAt),
              updatedAt: new Date((doc as any).updatedAt)
            })
          })
        } catch (e) {
          console.error('Failed to load documents:', e)
        }
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener())
    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      const obj: Record<string, Document> = {}
      this.documents.forEach((doc, id) => {
        obj[id] = doc
      })
      localStorage.setItem('documents', JSON.stringify(obj))
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  createDocument(title: string = 'Untitled Document'): Document {
    const id = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const doc: Document = {
      id,
      title,
      content: '<h1>' + title + '</h1><p>Start typing here...</p>',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'document'
    }
    this.documents.set(id, doc)
    this.notify()
    return doc
  }

  updateDocument(id: string, updates: Partial<Omit<Document, 'id' | 'createdAt' | 'type'>>) {
    const doc = this.documents.get(id)
    if (doc) {
      this.documents.set(id, {
        ...doc,
        ...updates,
        updatedAt: new Date()
      })
      this.notify()
    }
  }

  getDocument(id: string): Document | undefined {
    return this.documents.get(id)
  }

  getAllDocuments(): Document[] {
    return Array.from(this.documents.values()).sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    )
  }

  deleteDocument(id: string) {
    this.documents.delete(id)
    this.notify()
  }
}

export const documentStore = new DocumentStore()